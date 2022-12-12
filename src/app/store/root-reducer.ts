import { InjectionToken } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '@store/auth';
import * as fromFeed from '@store/feed';

export interface AppState {
  [fromAuth.featureKey]: fromAuth.State;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('Root reducers token', {
  factory: () => ({
    router: routerReducer,
    [fromAuth.featureKey]: fromAuth.reducer,
    [fromFeed.featureKey]: fromFeed.reducer,
  }),
});
