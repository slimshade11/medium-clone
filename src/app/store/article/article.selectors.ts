import { Article } from '@feed/models/article.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/article/article.reducer';

export const articleState = createFeatureSelector<State>(featureKey);

export const isLoading = createSelector(articleState, ({ isLoading }: State): boolean => isLoading);
export const data = createSelector(articleState, ({ data }: State): Article | null => data);
export const error = createSelector(articleState, ({ error }: State): string | null => error);
