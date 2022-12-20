import { BackendErrors } from '@app/_core/models/backend-errors.model';
import { Article } from '@feed/models/article.model';
import { createReducer, on } from '@ngrx/store';
import { ArticleActions } from '@store/article';

export const featureKey = 'article';

export interface State {
  isLoading: boolean;
  error: string | null;
  data: Article | null;
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}

const initialState: State = {
  isLoading: false,
  data: null,
  error: null,
  isSubmitting: false,
  validationErrors: null,
};

export const reducer = createReducer(
  initialState,
  on(ArticleActions.getArticle, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(ArticleActions.getArticleSuccess, (state, { article }): State => {
    return { ...state, isLoading: false, data: article };
  }),
  on(ArticleActions.getArticleFailure, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(ArticleActions.createArticle, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(ArticleActions.createArticleSuccess, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(ArticleActions.createArticleFailure, (state, { errors }): State => {
    return { ...state, isLoading: false, validationErrors: errors };
  })
);
