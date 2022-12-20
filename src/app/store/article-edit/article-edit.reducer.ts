import { BackendErrors } from '@core/models/backend-errors.model';
import { Article } from '@feed/models/article.model';
import { createReducer, on } from '@ngrx/store';
import {
  editArticle,
  editArticleSuccess,
  editArticleFailure,
  getArticle,
  getArticleSuccess,
  getArticleFailure,
} from './article-edit.actions';

export const featureKey = 'article-edit';

export interface State {
  isLoading: boolean;
  article: Article | null;
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}

const initialState: State = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null,
};

export const reducer = createReducer(
  initialState,
  on(editArticle, (state): State => {
    return { ...state, isSubmitting: true };
  }),
  on(editArticleSuccess, (state): State => {
    return { ...state, isSubmitting: false };
  }),
  on(editArticleFailure, (state, { errors }): State => {
    return { ...state, isSubmitting: false, validationErrors: errors };
  }),
  on(getArticle, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(getArticleSuccess, (state, { article }): State => {
    return { ...state, isLoading: false, article };
  }),
  on(getArticleFailure, (state): State => {
    return { ...state, isLoading: false };
  })
);
