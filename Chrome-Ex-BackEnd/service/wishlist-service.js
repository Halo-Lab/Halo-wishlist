const UserModel = require('../models/user-modal');
const WishlistModel = require('../models/wishlist-modal');
const ApiError = require('../exceptions/api-error');
const WishlistDto = require('../dtos/wishlist-dto');

class WishlistService {
  async createWishlist(userId, name) {
    const wishlist = await WishlistModel.create({ userId, name });
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      throw ApiError.BadRequest(`User not found ${userId}`);
    }

    user.wishlist.push(wishlist._id);
    await user.save();
    return { wishlist };
  }

  async deleteWishlist(wishlistId) {
    const wishlist = await WishlistModel.deleteOne({ _id: wishlistId });

    if (wishlist.deletedCount === 0) {
      throw ApiError.BadRequest(`Wishlist not found ${wishlistId}`);
    }

    if (wishlist.deletedCount !== 0) {
      return { status: 'ok' };
    }
  }

  async addUrl(_id, url, nameURL, image, price) {
    const wishlist = await WishlistModel.findOne({ _id });
    if (!wishlist) {
      throw ApiError.BadRequest(`Wishlist not found ${_id}`);
    }
    const wishlistUrl = wishlist.items.filter((i) => i.url === url);
    if (wishlistUrl[0]?.url) {
      throw ApiError.BadRequest(`Wish with url ${url} already exists`);
    }
    wishlist.items.push({
      url,
      nameURL,
      image,
      price,
      isReserved: '',
      gotIt: false,
    });
    await wishlist.save();
    return wishlist.items;
  }

  async getWishlist(wishlistId) {
    const wishlist = await WishlistModel.findOne({ _id: wishlistId });
    if (!wishlist) {
      throw ApiError.BadRequest(`Wishlist not found ${wishlistId}`);
    }
    const user = await UserModel.findOne({ _id: wishlist.userId });

    const wishlistDto = new WishlistDto(wishlist, user);

    return wishlistDto;
  }

  async deleteWish(wishId) {
    const wish = await WishlistModel.updateMany(
      //find wish
      {
        items: {
          $elemMatch: {
            _id: wishId,
          },
        },
      },
      //delete wish
      { $pull: { items: { _id: wishId } } },
    );
    if (wish.modifiedCount === 0) {
      throw ApiError.BadRequest(`Wish not found ${wishId}`);
    }
    if (wish.modifiedCount !== 0) {
      return { status: 'ok' };
    }
  }

  async updateWish(wishId, url, nameURL, image, price, isReserved, gotIt) {
    const wish = await WishlistModel.updateMany(
      //find wish
      {
        items: {
          $elemMatch: {
            _id: wishId,
          },
        },
      },
      //update wish
      {
        $set: {
          'items.$.url': url,
          'items.$.nameURL': nameURL,
          'items.$.image': image,
          'items.$.price': price,
          'items.$.isReserved': isReserved,
          'items.$.gotIt': gotIt,
        },
      },
    );
    if (wish.matchedCount === 0) {
      throw ApiError.BadRequest(`Wish not found ${wishId}`);
    }
    if (wish.modifiedCount !== 0) {
      return { status: 'ok' };
    }
  }

  async getWishlists(userId) {
    const wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) {
      throw ApiError.BadRequest(`User not found ${userId}`);
    }
    return wishlist.items;
  }

  async getCategories(userId) {
    const categories = await WishlistModel.find({ userId });
    if (!categories) {
      throw ApiError.BadRequest(`User not found ${userId}`);
    }
    return categories;
  }
}

module.exports = new WishlistService();
