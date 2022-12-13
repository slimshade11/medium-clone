import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/popular-tags/popular-tags.reducer';

export const popularTagsState = createFeatureSelector<State>(featureKey);

export const popularTags = createSelector(popularTagsState, ({ data }: State): Array<string> | null => data);
export const error = createSelector(popularTagsState, ({ error }: State): string | null => error);
export const isLoading = createSelector(popularTagsState, ({ isLoading }: State): boolean => isLoading);
