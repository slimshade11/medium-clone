import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/auth/auth.reducer';

export const authState = createFeatureSelector<State>(featureKey);

export const user = createSelector(authState, ({ user }) => user);
export const isLoading = createSelector(authState, ({ isLoading }) => isLoading);
