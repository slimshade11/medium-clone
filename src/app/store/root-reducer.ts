import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '@store/auth';

export interface AppState {
  [fromAuth.featureKey]: fromAuth.State;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('Root reducers token', {
  factory: () => ({
    [fromAuth.featureKey]: fromAuth.reducer,
  }),
});
