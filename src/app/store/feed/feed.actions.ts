import { GetFeedResponse } from '@feed/models/getFeedResponse.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/feed/action-types';

export const getFeed = createAction(ActionTypes.GET_FEED, props<{ url: string }>());
export const getFeedSuccess = createAction(ActionTypes.GET_FEED_SUCCESS, props<{ feed: GetFeedResponse }>());
export const getFeedFailure = createAction(ActionTypes.GET_FEED_FAILURE);
