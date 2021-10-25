const UserModel = require('../models/user-modal');
const WishlistModel = require('../models/wishlist-modal');
const ApiError = require('../exceptions/api-error');

class WishlistService {
  async createWishlist(userId, name) {
    const wishlist = await WishlistModel.create({name});
    const user = await UserModel.findOne({_id: userId});
    if (!user) {
      throw ApiError.BadRequest(`User not found ${userId}`);
    }

    user.wishList.push(wishlist._id)
    await user.save();
    return {wishlist};
  }

  async addUrl(_id, url, nameURL) {
    const wishlist = await WishlistModel.findOne({_id});
    if (!wishlist) {
      throw ApiError.BadRequest(`Wishlist not found ${_id}`);
    }
    const wishlistUrl = wishlist.items.filter((i) => i.url === url);
    if (wishlistUrl[0]?.url) {
      throw ApiError.BadRequest(`Wishlist with url ${url} already exists`);
    }
    wishlist.items.push({url, nameURL})
    await wishlist.save();
    return wishlist.items;
  }

  async getWishlist(wishlistId) {
    const wishlist = await WishlistModel.findOne({_id: wishlistId});
    if (!wishlist) {
      throw ApiError.BadRequest(`Wishlist not found ${wishlistId}`);
    }
    return wishlist;
  }
}

module.exports = new WishlistService();
