import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/auth/auth.reducer';

export const authState = createFeatureSelector<State>(featureKey);

export const currentUser = createSelector(authState, ({ currentUser }) => currentUser);
export const isLoading = createSelector(authState, ({ isLoading }) => isLoading);
export const isLoggedIn = createSelector(authState, ({ isLoggedIn }) => isLoggedIn);
export const errors = createSelector(authState, ({ errors }) => errors);
export const isAnonymous = createSelector(authState, ({ isLoggedIn }) => isLoggedIn === false);
