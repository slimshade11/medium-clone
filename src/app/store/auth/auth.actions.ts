import { LoginPayload } from '@auth/models/login-payload.model';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/auth/action-types';

export const register = createAction(ActionTypes.REGISTER, props<{ registerPayload: RegisterPayload }>());
export const registerSuccess = createAction(ActionTypes.REGISTER_SUCCESS, props<{ currentUser: CurrentUser }>());
export const registerFailure = createAction(ActionTypes.REGISTER_ERROR, props<{ errors: BackendErrors }>());

export const login = createAction(ActionTypes.LOGIN, props<{ loginPayload: LoginPayload }>());
export const loginSuccess = createAction(ActionTypes.LOGIN_SUCCESS, props<{ currentUser: CurrentUser }>());
export const loginFailure = createAction(ActionTypes.LOGIN_FAILURE, props<{ errors: BackendErrors }>());

export const getCurrentUser = createAction(ActionTypes.GET_CURRENT_USER);
export const getCurrentUserSuccess = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: CurrentUser }>()
);
export const getCurrentUserFailure = createAction(ActionTypes.GET_CURRENT_USER_FAILURE);
