import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/auth/auth.reducer';

export const authFeatureSelector = createFeatureSelector<State>(featureKey);

export const isLoading = createSelector(authFeatureSelector, ({ isLoading }: State): boolean => isLoading);
export const errors = createSelector(authFeatureSelector, ({ errors }: State): BackendErrors | null => errors);
export const isAnonymous = createSelector(authFeatureSelector, ({ isLoggedIn }: State) => isLoggedIn === false);
export const isLoggedIn = createSelector(authFeatureSelector, ({ isLoggedIn }: State): boolean | null => isLoggedIn);
export const currentUser = createSelector(
  authFeatureSelector,
  ({ currentUser }: State): CurrentUser | null => currentUser
);
