import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { Article } from '@feed/models/article.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/article/article.reducer';
import { fromAuth } from '@store/auth';

export const articleState = createFeatureSelector<State>(featureKey);

export const isLoading = createSelector(articleState, ({ isLoading }: State): boolean => isLoading);
export const article = createSelector(articleState, ({ article }: State): Article | null => article);
export const error = createSelector(articleState, ({ error }: State): string | null => error);
export const isSubmitting = createSelector(articleState, ({ isSubmitting }: State): boolean => isSubmitting);
export const validationErrors = createSelector(
  articleState,
  ({ validationErrors }: State): BackendErrors | null => validationErrors
);
export const isAuthor = createSelector(
  articleState,
  fromAuth.currentUser,
  ({ article }: State, currentUser: CurrentUser | null): boolean => {
    if (!article || !currentUser) {
      return false;
    }

    return currentUser.username === article.author.username;
  }
);
