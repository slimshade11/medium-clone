import { ArticleInitialValues } from '@article/models/article-initial-values.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { Article } from '@feed/models/article.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/article-edit/action-types';

export const getArticle = createAction(ActionTypes.GET_ARTICLE, props<{ slug: string }>());
export const getArticleSuccess = createAction(ActionTypes.GET_ARTICLE_SUCCESS, props<{ article: Article }>());
export const getArticleFailure = createAction(ActionTypes.GET_ARTICLE_FAILURE);

export const editArticle = createAction(
  ActionTypes.EDIT_ARTICLE,
  props<{ slug: string; articleEditPayload: ArticleInitialValues }>()
);
export const editArticleSuccess = createAction(ActionTypes.EDIT_ARTICLE_SUCCESS, props<{ article: Article }>());
export const editArticleFailure = createAction(ActionTypes.EDIT_ARTICLE_FAILURE, props<{ errors: BackendErrors }>());
