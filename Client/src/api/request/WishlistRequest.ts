import api from '..';
import { AxiosResponse } from 'axios';

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
}
