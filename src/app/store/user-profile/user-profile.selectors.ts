import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/user-profile/user-profile.reducer';
import { UserProfile } from '@user-profile/models/user-profile.model';

export const userProfileFeatureSelector = createFeatureSelector<State>(featureKey);

export const userProfile = createSelector(
  userProfileFeatureSelector,
  ({ userProfile }: State): UserProfile | null => userProfile
);
export const isLoading = createSelector(userProfileFeatureSelector, ({ isLoading }: State): boolean => isLoading);
export const error = createSelector(userProfileFeatureSelector, ({ error }: State): string | null => error);
