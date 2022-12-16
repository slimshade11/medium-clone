import { createReducer, on } from '@ngrx/store';
import { getPopularTags, getPopularTagsFailure, getPopularTagsSuccess } from '@store/popular-tags/popular-tags.actions';

export const featureKey = 'popular-tags';

export interface State {
  data: Array<string> | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  data: null,
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(getPopularTags, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(getPopularTagsSuccess, (state, { popularTags }): State => {
    return { ...state, isLoading: false, data: popularTags };
  }),
  on(getPopularTagsFailure, (state): State => {
    // handle backend errors
    return { ...state };
  })
);
