import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailure,
  registerSuccess,
  registerFailure,
  loginSuccess,
  register,
} from '@store/auth/auth.actions';
import { getCurrentUser, getCurrentUserSuccess, getCurrentUserFailure } from './auth.actions';

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
  }),
  on(login, (state): State => {
    return { ...state, isLoading: true, errors: null };
  }),
  on(loginSuccess, (state, { currentUser }): State => {
    return { ...state, isLoading: false, isLoggedIn: true, currentUser };
  }),
  on(loginFailure, (state, { errors }): State => {
    return { ...state, isLoading: false, errors };
  }),
  on(getCurrentUser, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(getCurrentUserSuccess, (state, { currentUser }): State => {
    return { ...state, isLoading: false, isLoggedIn: true, currentUser };
  }),
  on(getCurrentUserFailure, (state): State => {
    return { ...state, isLoading: false, isLoggedIn: false, currentUser: null };
  })
);
