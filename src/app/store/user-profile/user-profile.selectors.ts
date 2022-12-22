import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromAuth, State as AuthState } from '@store/auth';
import { featureKey, State } from '@store/user-profile/user-profile.reducer';
import { UserProfile } from '@user-profile/models/user-profile.model';

export const userProfileFeatureSelector = createFeatureSelector<State>(featureKey);

export const isLoading = createSelector(userProfileFeatureSelector, ({ isLoading }: State): boolean => isLoading);
export const error = createSelector(userProfileFeatureSelector, ({ error }: State): string | null => error);
export const userProfile = createSelector(
  userProfileFeatureSelector,
  ({ userProfile }: State): UserProfile | null => userProfile
);
export const isCurrentUserProfile = createSelector(
  userProfileFeatureSelector,
  fromAuth.authFeatureSelector,
  ({ userProfile }: State, { currentUser }: AuthState): boolean => {
    return userProfile?.username === currentUser?.username;
  }
);
