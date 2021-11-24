import api from '..';
import { AxiosResponse } from 'axios';

import { IUser } from '../../models/IUser';
import { UserResponse } from '../../models/response/UserResponse';
import { IInitialValues } from '../../scenes/ProfileSettings/common-types';

type userResponse = {
  user: IUser;
};

export default class UserRequest {
  static async updateUserPic(userPic: string): Promise<AxiosResponse<UserResponse>> {
    return api.put('/user/userPic', { userPic });
  }
  static async updateUSerProfile(
    options: IInitialValues,
  ): Promise<AxiosResponse<userResponse>> {
    return api.put('/user', {
      ...options,
    });
  }
}
