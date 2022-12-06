import { GetFeedResponse } from '@feed/models/getFeedResponse.model';
import { createReducer, on } from '@ngrx/store';
import { getFeedFailure, getFeedSuccess } from '@store/feed/feed.actions';
import { getFeed } from './feed.actions';
export const featureKey = 'feed';

export interface State {
  isLoading: boolean;
  error: string | null;
  data: GetFeedResponse | null;
}

const initialState: State = {
  isLoading: false,
  error: null,
  data: null,
};

export const reducer = createReducer(
  initialState,
  on(getFeed, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(getFeedSuccess, (state, { feed }): State => {
    return { ...state, isLoading: false, data: feed };
  }),
  on(getFeedFailure, (state): State => {
    return { ...state, isLoading: false };
  })
);
