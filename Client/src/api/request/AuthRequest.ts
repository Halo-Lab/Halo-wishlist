import api from '..';
import { AxiosResponse } from 'axios';

import { IWishlist } from '../../models/IWishlist';
import { AuthResponse } from '../../models/response/AuthResponse';

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

  static async resetPassword(
    email: string,
  ): Promise<AxiosResponse<{ message: string }>> {
    return api.post('/sendResetMailPassword', { email });
  }

  static async getWishlist(listID: string) {
    return api.get<IWishlist>(`/wishlist/${listID}`);
  }

  static async googleAuth(token: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post(`/auth/google`, { token });
  }

  static async facebookAuth(
    userID: string,
    token: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post(`/auth/facebook`, { userID, token });
  }
}
