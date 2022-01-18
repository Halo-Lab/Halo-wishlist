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

  static async deleteWishlists(
    wishlistId: string,
  ): Promise<AxiosResponse<{ status: string }>> {
    return api.delete(`wishlist/${wishlistId}`);
  }

  static async updateWish(wish: {
    url?: string;
    nameURL?: string;
    image?: string;
    price?: string;
    _id?: string;
    isReserved?: string;
    gotIt?: boolean;
  }): Promise<AxiosResponse<{ status: string }>> {
    return api.put(`wish/${wish._id}`, { ...wish });
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
  ): Promise<AxiosResponse<IProduct[]>> {
    return api.post(`addUrl`, { _id, url, nameURL, image, price });
  }
}
