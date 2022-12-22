import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '@store/auth';

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
  on(AuthActions.register, (state): State => {
    return { ...state, isLoading: true, errors: null };
  }),
  on(AuthActions.registerSuccess, (state, { currentUser }): State => {
    return { ...state, isLoading: false, isLoggedIn: true, currentUser };
  }),
  on(AuthActions.registerFailure, (state, { errors }): State => {
    return { ...state, isLoading: false, errors };
  }),
  on(AuthActions.login, (state): State => {
    return { ...state, isLoading: true, errors: null };
  }),
  on(AuthActions.loginSuccess, (state, { currentUser }): State => {
    return { ...state, isLoading: false, isLoggedIn: true, currentUser };
  }),
  on(AuthActions.loginFailure, (state, { errors }): State => {
    return { ...state, isLoading: false, errors };
  }),
  on(AuthActions.getCurrentUser, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(AuthActions.getCurrentUserSuccess, (state, { currentUser }): State => {
    return { ...state, isLoading: false, isLoggedIn: true, currentUser };
  }),
  on(AuthActions.getCurrentUserFailure, (state): State => {
    return { ...state, isLoading: false, isLoggedIn: false, currentUser: null };
  }),
  on(AuthActions.updateCurrentUserSuccess, (state, { currentUser }): State => {
    return { ...state, currentUser };
  }),
  on(AuthActions.logout, (state): State => {
    return { ...state, ...initialState, isLoggedIn: false };
  })
);
