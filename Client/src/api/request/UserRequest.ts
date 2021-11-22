import api from '..';
import { AxiosResponse } from 'axios';

import { UserResponse } from '../../models/response/UserResponse';
import { IInitialValues } from '../../scenes/ProfileSettings/common-types';

export default class UserRequest {
  static async updateUserPic(userPic: string): Promise<AxiosResponse<UserResponse>> {
    return api.put('/user/userPic', { userPic });
  }
  static async updateUSerProfile(options: IInitialValues): Promise<AxiosResponse> {
    return api.put('/user', {
      ...options,
    });
  }
}
