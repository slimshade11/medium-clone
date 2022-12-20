import { Article } from '@app/modules/feed/models/article.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/article-edit/article-edit.reducer';

export const editArticleFeatureSelector = createFeatureSelector<State>(featureKey);

export const article = createSelector(editArticleFeatureSelector, ({ article }: State): Article | null => article);
export const isLoading = createSelector(editArticleFeatureSelector, ({ isLoading }: State): boolean => isLoading);
export const isSubmitting = createSelector(
  editArticleFeatureSelector,
  ({ isSubmitting }: State): boolean => isSubmitting
);

export const validationErrors = createSelector(
  editArticleFeatureSelector,
  ({ validationErrors }: State): BackendErrors | null => validationErrors
);
