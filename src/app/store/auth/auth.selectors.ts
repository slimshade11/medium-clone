import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/auth/auth.reducer';

export const authState = createFeatureSelector<State>(featureKey);

export const currentUser = createSelector(authState, ({ currentUser }: State): CurrentUser | null => currentUser);
export const isLoading = createSelector(authState, ({ isLoading }: State): boolean => isLoading);
export const isLoggedIn = createSelector(authState, ({ isLoggedIn }: State): boolean | null => isLoggedIn);
export const errors = createSelector(authState, ({ errors }: State): BackendErrors | null => errors);
export const isAnonymous = createSelector(authState, ({ isLoggedIn }: State) => isLoggedIn === false);
