const userService = require('../service/user-service');
const TokenModal = require('../models/token-modal');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

const setCookie = (res, userData, remember = true) =>
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 3600000,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      setCookie(res, userData);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password, remember } = req.body;
      const userData = await userService.login(email, password, remember);
      setCookie(res, userData, remember);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL + '/settings');
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      await setCookie(res, userData, await TokenModal.findOne({ refreshToken }));
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(['123', '456']);
    } catch (e) {
      next(e);
    }
  }

  async loginExtension(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const { _id } = req.body;
      const userData = await userService.loginExtension(_id);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req, res, next) {
    const id = req.user.id;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const {
        name,
        bio,
        date,
        nickName,
        password,
        newPassword,
        facebook,
        instagram,
        twitter,
      } = req.body;
      if (newPassword?.length > 0) {
        await userService.changePassword(id, password, newPassword);
      }
      const userData = await userService.updateUser(
        id,
        name,
        bio,
        date,
        nickName,
        facebook,
        instagram,
        twitter,
      );
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async updateUserPic(req, res, next) {
    const id = req.user.id;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const { userPic } = req.body;
      const userData = await userService.updateUserPic(id, userPic);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
