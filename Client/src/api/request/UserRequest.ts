import api from '..';
import { AxiosResponse } from 'axios';

import { UserResponse } from '../../models/response/UserResponse';

export default class UserRequest {
  static async updateUserPic(userPic: string): Promise<AxiosResponse<UserResponse>> {
    return api.put('/user/userPic', { userPic });
  }
  static async updateUSerProfile(
    name: string,
    bio: string,
    date: any,
  ): Promise<AxiosResponse> {
    return api.put('/user', { name, bio, date });
  }
}
