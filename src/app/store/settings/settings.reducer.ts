import { BackendErrors } from '@core/models/backend-errors.model';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '@store/auth';

export const featureKey = 'settings';

export interface State {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}

const initialState: State = {
  isSubmitting: false,
  validationErrors: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.updateCurrentUser, (state): State => {
    return { ...state, isSubmitting: true };
  }),
  on(AuthActions.updateCurrentUserSuccess, (state): State => {
    return { ...state, isSubmitting: false };
  }),
  on(AuthActions.updateCurrentUserFailure, (state, { errors }): State => {
    return { ...state, isSubmitting: false, validationErrors: errors };
  })
);
