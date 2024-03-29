const UserModel = require('../models/user-modal');
const WishlistModel = require('../models/wishlist-modal');
const ArchiveModel = require('../models/archive-modal');
const ApiError = require('../exceptions/api-error');
const WishlistDto = require('../dtos/wishlist-dto');
const urlMetadata = require('url-metadata');

const deleteWishHelper = async (id, from = 'wishlist') => {
  const model = from === 'archive' ? ArchiveModel : WishlistModel;
  const wish = await model.updateMany(
    //find wish
    {
      items: {
        $elemMatch: {
          _id: id,
        },
      },
    },
    //delete wish
    { $pull: { items: { _id: id } } },
  );
  if (wish.modifiedCount === 0) {
    throw ApiError.BadRequest(`Wish not found`);
  }
  if (wish.modifiedCount !== 0) {
    return { status: 'ok' };
  }
};

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

  async parseUrl(url) {
    return urlMetadata(url).then(
      function (metadata) {
        // success handler
        const { title, description, image, price, jsonld, name } = metadata;
        return {
          url,
          nameURL: name || jsonld?.name || description || title,
          image:
            (jsonld?.image && jsonld?.image[0]) ||
            image ||
            metadata['og:image'] ||
            metadata['og:image:secure_url'],
          price: jsonld?.offers?.price || price,
        };
      },
      function (error) {
        console.error(error);
        return error;
      },
    );
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
    return deleteWishHelper(wishId);
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

  async setToArchive(wishId, wishItemId, url, nameURL, image, price) {
    const { userId } = await WishlistModel.findOne({ _id: wishId });
    const archive = await ArchiveModel.findOne({ userId });

    if (!archive) {
      const archive = await ArchiveModel.create({ userId });
      archive.items.push({ url, nameURL, image, price });
      await archive.save();
      return deleteWishHelper(wishItemId);
    } else {
      archive.items.push({ url, nameURL, image, price });
      await archive.save();
      return deleteWishHelper(wishItemId);
    }
  }

  async deleteFromArchive(wishId) {
    return deleteWishHelper(wishId, 'archive');
  }

  async getFromArchive(userId) {
    const archive = await ArchiveModel.findOne({ userId });
    if (!archive) {
      return [];
    }

    return archive.items;
  }

  async restoreFromArchive(userId, wishlistId, wishId) {
    const archive = await ArchiveModel.findOne({ userId });
    const wishlist = await WishlistModel.findOne({ _id: wishlistId });
    if (!archive || !wishlist) {
      throw ApiError.BadRequest(`Wish restore error!`);
    }
    const { url, nameURL, image, price, _id } = archive.items.find(
      (item) => item._id.toString() === wishId,
    );
    wishlist.items.push({ url, nameURL, image, price });
    await wishlist.save();
    deleteWishHelper(wishId, 'archive');
  }
}

module.exports = new WishlistService();
