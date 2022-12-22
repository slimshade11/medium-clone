import { UserLoginData } from '@auth/models/user-login-data.model';

export interface UserRegisterData extends UserLoginData {
  username: string;
}
