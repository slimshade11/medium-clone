import { BackendErrors } from '@core/models/backend-errors.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureKey } from '@store/settings/settings.reducer';

export const settingsFeatureSelector = createFeatureSelector<State>(featureKey);

export const isSubmitting = createSelector(settingsFeatureSelector, ({ isSubmitting }: State): boolean => isSubmitting);
export const validationErrors = createSelector(
  settingsFeatureSelector,
  ({ validationErrors }: State): BackendErrors | null => validationErrors
);
