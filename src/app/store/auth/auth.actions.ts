import { User } from '@app/modules/auth/models/user.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/auth/action-types';

export const register = createAction(ActionTypes.REGISTER, props<{ user: User }>());
