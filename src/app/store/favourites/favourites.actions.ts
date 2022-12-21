import { Article } from '@feed/models/article.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/favourites/action-types';

export const addToFavourites = createAction(
  ActionTypes.ADD_TO_FAVOURITES,
  props<{ isFavourited: boolean; slug: string }>()
);
export const addToFavouritesSuccess = createAction(
  ActionTypes.ADD_TO_FAVOURITES_SUCCESS,
  props<{ article: Article }>()
);
export const addToFavouritesFailure = createAction(ActionTypes.ADD_TO_FAVOURITES_FAILURE);
