import { Article } from '@feed/models/article.model';
import { createReducer, on } from '@ngrx/store';
import { getArticle, getArticleSuccess, getArticleFailure } from './article.actions';

export const featureKey = 'article';

export interface State {
  isLoading: boolean;
  error: string | null;
  data: Article | null;
}

const initialState: State = {
  isLoading: false,
  data: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(getArticle, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(getArticleSuccess, (state, { article }): State => {
    return { ...state, isLoading: false, data: article };
  }),
  on(getArticleFailure, (state): State => {
    return { ...state, isLoading: false };
  })
);
