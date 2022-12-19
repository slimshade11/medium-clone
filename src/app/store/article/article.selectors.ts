import { CurrentUser } from '@auth/models/user.model';
import { Article } from '@feed/models/article.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '@store/article/article.reducer';
import { fromAuth } from '@store/auth';

export const articleState = createFeatureSelector<State>(featureKey);

export const isLoading = createSelector(articleState, ({ isLoading }: State): boolean => isLoading);
export const article = createSelector(articleState, ({ data }: State): Article | null => data);
export const error = createSelector(articleState, ({ error }: State): string | null => error);

export const isAuthor = createSelector(
  articleState,
  fromAuth.currentUser,
  ({ data }: State, currentUser: CurrentUser | null) => {
    if (!data || !currentUser) {
      return false;
    }

    return currentUser.username === data.author.username;
  }
);
