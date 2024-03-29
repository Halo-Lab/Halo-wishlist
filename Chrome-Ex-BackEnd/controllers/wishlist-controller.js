const wishlistService = require('../service/wishlist-service');
const { validationResult } = require('express-validator');
const TokenModal = require('../models/token-modal');
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

  async parseUrl(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const { url } = req.body;
      const siteData = await wishlistService.parseUrl(url);
      return res.json(siteData);
    } catch (e) {
      res.json(e);
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

  async deleteWish(req, res, next) {
    try {
      const { wishId } = req.params;
      const wish = await wishlistService.deleteWish(wishId);
      return res.json(wish);
    } catch (e) {
      next(e);
    }
  }

  async updateWish(req, res, next) {
    const { url, nameURL, image, price, isReserved, gotIt } = req.body;
    try {
      const { wishId } = req.params;
      const wish = await wishlistService.updateWish(
        wishId,
        url,
        nameURL,
        image,
        price,
        isReserved,
        gotIt,
      );
      return res.json(wish);
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

  async setItemToArchive(req, res, next) {
    try {
      const {
        wishId,
        wish: { url, nameURL, image, price, _id: wishItemId },
      } = req.body;
      const archiveData = await wishlistService.setToArchive(
        wishId,
        wishItemId,
        url,
        nameURL,
        image,
        price,
      );
      return res.json({ message: 'Wish is added to archive' });
    } catch (e) {
      next(e);
    }
  }

  async deleteItemFromArchive(req, res, next) {
    try {
      const { wishId } = req.body;
      const archiveData = await wishlistService.deleteFromArchive(wishId);
      return res.json({ message: 'Wish is deleted from archive' });
    } catch (e) {
      next(e);
    }
  }

  async getItemsFromArchive(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await TokenModal.findOne({ refreshToken });

      const archiveItems = await wishlistService.getFromArchive(
        userData?.user.toString(),
      );
      return res.json(archiveItems);
    } catch (e) {
      next(e);
    }
  }

  async restoreItemsFromArchive(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await TokenModal.findOne({ refreshToken });
      const { wishlistId, wishId } = req.body;
      const archiveItems = await wishlistService.restoreFromArchive(
        userData.user.toString(),
        wishlistId,
        wishId,
      );
      return res.json({ message: 'Wish added successfully!' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new WishlistController();
