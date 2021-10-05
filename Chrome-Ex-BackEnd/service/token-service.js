const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-modal');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_REFRESH, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  async saveTokens(userId, refreshToken) {
    const tokenData = await tokenModel.findOne(userId);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_REFRESH);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async removeToken(refreshToken) {
    const tokenDada = tokenModel.deleteOne({ refreshToken });
    return tokenDada;
  }
  async findToken(refreshToken) {
    const tokenDada = tokenModel.findOne({ refreshToken });
    return tokenDada;
  }
}

module.exports = new TokenService();
