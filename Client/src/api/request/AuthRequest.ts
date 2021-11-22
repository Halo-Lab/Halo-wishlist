import api from '..';
import { AxiosResponse } from 'axios';

import { AuthResponse } from '../../models/response/AuthResponse';
import { IWishlist } from '../../models/IWishlist';

export default class AuthRequest {
  static async login(
    email: string,
    password: string,
    remember: boolean,
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post('/login', { email, password, remember });
  }
  static async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post('/registration', { email, password });
  }
  static async logout(): Promise<void> {
    return api.post('/logout');
  }
  static async getWishlist(listID: string) {
    return api.get<IWishlist>(`/wishlist/${listID}`);
  }
}
