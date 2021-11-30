import api from '..';
import { AxiosResponse } from 'axios';

import { IProduct } from '../../models/IProduct';
import { IWishlist } from '../../models/IWishlist';

export default class WishlistRequest {
  static async getWishlists(userId: string): Promise<AxiosResponse<IWishlist[]>> {
    return api.get(`categories/${userId}`);
  }

  static async addWishlists(
    title: string,
  ): Promise<AxiosResponse<{ wishlist: IWishlist }>> {
    return api.post(`addWishlist`, { name: title });
  }

  static async updateWish(
    wishId,
    url,
    nameURL,
    image,
    price,
  ): Promise<AxiosResponse<{ wish: IProduct }>> {
    return api.put(`wish/${wishId}`, { url, nameURL, image, price });
  }

  static async deleteWish(wishId): Promise<AxiosResponse<{ wish: IProduct }>> {
    return api.delete(`wish/${wishId}`);
  }

  static async addWish(
    _id,
    url,
    nameURL,
    image,
    price,
  ): Promise<AxiosResponse<{ wish: IProduct }>> {
    return api.post(`addUrl`, { _id, url, nameURL, image, price });
  }
}
