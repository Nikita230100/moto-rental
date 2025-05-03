import { axiosInstance } from '../../../shared/lib/axiosInstance';
import { ServerResponseType } from '../../../shared/types';
import { UserDataType, UserResponseType } from '../model';

export default class UserApi {
  static async refreshTokens(): Promise<ServerResponseType<UserResponseType>> {
    const { data } = await axiosInstance.get('/auth/refreshTokens');
    return data;
  }

  static async signUp(
    userData: Partial<UserDataType>
  ): Promise<ServerResponseType<UserResponseType>> {
    const { data } = await axiosInstance.post('/auth/signUp', userData);
    return data;
  }

  static async signIn(
    userData: UserDataType
  ): Promise<ServerResponseType<UserResponseType>> {
    const { data } = await axiosInstance.post('/auth/signIn', userData);
    return data;
  }

  static async signOut(): Promise<ServerResponseType<null>> {
    const { data } = await axiosInstance.get('/auth/signOut');
    return data;
  }
}
