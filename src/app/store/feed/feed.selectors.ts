import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/feed/feed.reducer';

export const feedState = createFeatureSelector<State>(featureKey);

export const isLoading = createSelector(feedState, ({ isLoading }) => isLoading);
export const error = createSelector(feedState, ({ error }) => error);
export const feedData = createSelector(feedState, ({ data }) => data);

// isLoading: boolean;
// error: string | null;
// data: GetFeedResponse | null;
