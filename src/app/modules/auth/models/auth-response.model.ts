import { CurrentUser } from '@auth/models/user.model';

export interface AuthResponse {
  user: CurrentUser;
}
