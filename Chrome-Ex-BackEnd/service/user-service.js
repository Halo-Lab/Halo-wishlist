const UserModel = require('../models/user-modal');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./email-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dtos');
const ApiError = require('../exceptions/api-error');
const WishlistModel = require('../models/wishlist-modal');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');

const createAccountGoogleFB = async (data) => {
  const { name, email, image, token } = data;
  const user = await UserModel.findOne({ email });

  if (user) {
    // login
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveTokens(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  } else {
    // registration
    const user = await UserModel.create({
      email,
      password: email + token,
      name,
      isActivated: true,
      userPic: image,
    });
    const wishlist = await WishlistModel.create({
      userId: user._id,
      name: 'wishlist',
    });
    user.wishlist.push(wishlist._id);
    await user.save();
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveTokens(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
};

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.senActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );

    const wishlist = await WishlistModel.create({
      userId: user._id,
      name: 'wishlist',
    });
    user.wishlist.push(wishlist._id);
    await user.save();
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveTokens(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password, remember) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User not found`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Incorrect Password`);
    }
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveTokens(userDto.id, tokens.refreshToken, remember);

    return { ...tokens, user: userDto };
  }

  async googleAuth(token) {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    if (payload.email_verified) {
      return await createAccountGoogleFB({
        ...payload,
        image: payload.picture,
        token,
      });
    }
  }

  async facebookAuth(userID, token) {
    const payload = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture.width(1000).height(1000)&access_token=${token}`;

    const data = await fetch(payload, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        return { ...res, image: res.picture.data.url, token };
      });

    if (!data.email) {
      throw ApiError.BadRequest(
        `Your FB account isn't connected to email. Please use your email to create an account.`,
      );
    }
    return await createAccountGoogleFB(data);
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveTokens(
      userDto.id,
      tokens.refreshToken,
      tokenFromDb.remember,
    );
    return {
      ...tokens,
      user: userDto,
    };
  }

  async loginExtension(_id) {
    const user = await UserModel.findOne({ _id });
    if (!user) {
      throw ApiError.BadRequest(`Invalid verification code ${_id}`);
    }
    return { user };
  }

  async updateUser(_id, name, bio, date, nickName, facebook, twitter, instagram) {
    const user = await UserModel.findOne({ _id });
    if (!user) {
      throw ApiError.BadRequest(`User not found`);
    }

    user.name = name;
    user.bio = bio;
    user.date = date;
    user.nickName = nickName;
    user.facebook = facebook;
    user.instagram = instagram;
    user.twitter = twitter;

    await user.save();

    const userDto = new UserDto(user);

    return { user: userDto };
  }

  async updateUserPic(_id, userPic) {
    const user = await UserModel.findOne({ _id });
    if (!user) {
      throw ApiError.BadRequest(`User not found`);
    }

    user.userPic = userPic;

    await user.save();

    const userDto = new UserDto(user);
    return { user: userDto };
  }

  async changePassword(_id, password, newPassword) {
    const user = await UserModel.findOne({ _id });
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Incorrect Password`);
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 3);
    user.password = hashNewPassword;

    await user.save();
    const userDto = new UserDto(user);
    return { user: userDto };
  }

  async sendPasswordMail(email) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User not found`);
    }
    const newPassword = uuid.v4().slice(0, 11).replace('-', '');
    const hasNewPassword = await bcrypt.hash(newPassword, 3);
    user.password = hasNewPassword;
    await mailService.senResetPasswordMail(email, newPassword);
    await user.save();
  }
}

module.exports = new UserService();
