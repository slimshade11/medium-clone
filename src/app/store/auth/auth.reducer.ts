import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { createReducer, on } from '@ngrx/store';
import { register } from '@store/auth/auth.actions';
import { registerSuccess, registerFailure } from './auth.actions';

export const featureKey = 'auth';

export interface State {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  isLoggedIn: boolean | null;
  errors: BackendErrors | null;
}

const initialState: State = {
  currentUser: null,
  isLoading: false,
  isLoggedIn: null,
  errors: null,
};

export const reducer = createReducer(
  initialState,
  on(register, (state): State => {
    return { ...state, isLoading: true, errors: null };
  }),
  on(registerSuccess, (state, { currentUser }): State => {
    return { ...state, isLoading: false, isLoggedIn: true, currentUser };
  }),
  on(registerFailure, (state, { errors }): State => {
    return { ...state, isLoading: false, errors };
  })
);
