const wishlistService = require('../service/wishlist-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class WishlistController {
  async createWishlist(req, res, next) {
    const userId = req.user.id;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const { name } = req.body;
      const userData = await wishlistService.createWishlist(userId, name);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async deleteWishlist(req, res, next) {
    try {
      const { wishlistId } = req.params;
      const wishlist = await wishlistService.deleteWishlist(wishlistId);
      return res.json(wishlist);
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
      const { _id, url, nameURL, image, price } = req.body;
      const wishlistData = await wishlistService.addUrl(
        _id,
        url,
        nameURL,
        image,
        price,
      );
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
      const { wishlistId } = req.params;
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
      const { userId } = req.params;
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
      const { userId } = req.params;
      const categories = await wishlistService.getCategories(userId);
      return res.json(categories);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new WishlistController();
