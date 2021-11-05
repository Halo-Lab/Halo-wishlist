import api from '..';
import { AxiosResponse } from 'axios';

import { UserResponse } from '../../models/response/UserResponse';

export default class UserRequest {
  static async updateUserPic(userPic: string): Promise<AxiosResponse<UserResponse>> {
    return api.put('/user/userPic', { userPic });
  }
}
