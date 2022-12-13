import { InjectionToken } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '@store/auth';
import * as fromFeed from '@store/feed';
import * as fromPopularTags from '@store/popular-tags';

export interface AppState {
  [fromAuth.featureKey]: fromAuth.State;
  [fromFeed.featureKey]: fromFeed.State;
  [fromPopularTags.featureKey]: fromPopularTags.State;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('Root reducers token', {
  factory: () => ({
    router: routerReducer,
    [fromAuth.featureKey]: fromAuth.reducer,
    [fromFeed.featureKey]: fromFeed.reducer,
    [fromPopularTags.featureKey]: fromPopularTags.reducer,
  }),
});
