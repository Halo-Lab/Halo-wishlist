const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-modal');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, 'secret-key', {expiresIn: '1h'});
    const refreshToken = jwt.sign(payload, "secret-key-refresh", {expiresIn: '30d'});

    return {accessToken, refreshToken};
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, 'secret-key');
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, "secret-key-refresh");
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveTokens(userId, refreshToken,remember) {
    const tokenData = await tokenModel.findOne({user: userId});

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({user: userId, refreshToken, remember});
    return token;
  }

  async removeToken(refreshToken) {
    const tokenDada = tokenModel.deleteOne({refreshToken});
    return tokenDada;
  }

  async findToken(refreshToken) {
    const tokenDada = tokenModel.findOne({refreshToken});
    return tokenDada;
  }
}

module.exports = new TokenService();
