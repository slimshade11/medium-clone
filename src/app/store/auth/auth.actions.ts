import { RegisterPayload } from '@auth/models/register-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/auth/action-types';

export const register = createAction(ActionTypes.REGISTER, props<{ payload: RegisterPayload }>());
export const registerSuccess = createAction(ActionTypes.REGISTER_SUCCESS, props<{ currentUser: CurrentUser }>());
export const registerFailure = createAction(ActionTypes.REGISTER_ERROR, props<{ errors: BackendErrors }>());
