import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/user-profile/action-types';
import { UserProfile } from '@user-profile/models/user-profile.model';

export const getUserProfile = createAction(ActionTypes.GET_USER_PROFILE, props<{ slug: string }>());
export const getUserProfileSuccess = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{ userProfile: UserProfile }>()
);
export const getUserProfileFailure = createAction(ActionTypes.GET_USER_PROFILE_FAILURE);
