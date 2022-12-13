import { GetFeedResponse } from '@feed/models/get-feed-response.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/feed/feed.reducer';

export const feedState = createFeatureSelector<State>(featureKey);

export const isLoading = createSelector(feedState, ({ isLoading }: State): boolean => isLoading);
export const error = createSelector(feedState, ({ error }: State): string | null => error);
export const feedData = createSelector(feedState, ({ data }: State): GetFeedResponse | null => data);
