const wishlistService = require('../service/wishlist-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class WishlistController {
  async createWishlist(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const {userId, name} = req.body;
      const userData = await wishlistService.createWishlist(userId, name);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async addUrl(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const {_id, url, nameURL} = req.body;
      const wishlistData = await wishlistService.addUrl(_id, url, nameURL);
      return res.json(wishlistData);
    } catch (e) {
      next(e);
    }
  }

  async getWishlist(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const {wishlistId} = req.params;
      const wishlist = await wishlistService.getWishlist(wishlistId);
      return res.json(wishlist);
    } catch (e) {
      next(e);
    }
  }

  async getWishlists(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const {userId} = req.params;
      const wishlists = await wishlistService.getWishlists(userId);
      return res.json(wishlists);
    } catch (e) {
      next(e);
    }
  }

  async getCategories(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const {userId} = req.params;
      const categories = await wishlistService.getCategories(userId);
      return res.json(categories);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new WishlistController();