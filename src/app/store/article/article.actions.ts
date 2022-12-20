import { ArticleInitialValues } from '@article/models/article-initial-values.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { Article } from '@feed/models/article.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/article/action-types';

export const getArticle = createAction(ActionTypes.GET_ARTICLE, props<{ slug: string }>());
export const getArticleSuccess = createAction(ActionTypes.GET_ARTICLE_SUCCESS, props<{ article: Article }>());
export const getArticleFailure = createAction(ActionTypes.GET_ARTICLE_FAILURE);

export const deleteArticle = createAction(ActionTypes.DELETE_ARTICLE, props<{ slug: string }>());
export const deleteArticleSuccess = createAction(ActionTypes.DELETE_ARTICLE);
export const deleteArticleFailure = createAction(ActionTypes.DELETE_ARTICLE);

export const createArticle = createAction(
  ActionTypes.CREATE_ARTICLE,
  props<{ createArticlePayload: ArticleInitialValues }>()
);
export const createArticleSuccess = createAction(ActionTypes.CREATE_ARTICLE_SUCCESS, props<{ article: Article }>());
export const createArticleFailure = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrors }>()
);
