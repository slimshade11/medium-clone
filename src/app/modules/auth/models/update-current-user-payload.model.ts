import { CurrentUser } from '@auth/models/user.model';

export interface UpdateCurrentUserPayload extends CurrentUser {
  password: string;
}
