import { GetFeedResponse } from '@feed/models/get-feed-response.model';
import { routerNavigationAction } from '@ngrx/router-store';
import { createReducer, on } from '@ngrx/store';
import { getFeed, getFeedFailure, getFeedSuccess } from '@store/feed/feed.actions';
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
  }),
  on(routerNavigationAction, (): State => {
    return initialState;
  })
);
