import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/popular-tags/action-types';

export const getPopularTags = createAction(ActionTypes.GET_POPULAR_TAGS);
export const getPopularTagsSuccess = createAction(
  ActionTypes.GET_POPULAR_TAGS_SUCCESS,
  props<{ popularTags: Array<string> }>()
);
export const getPopularTagsFailure = createAction(ActionTypes.GET_POPULAR_TAGS__FAILURE);
