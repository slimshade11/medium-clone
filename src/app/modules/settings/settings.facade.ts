import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UpdateCurrentUserPayload } from '@auth/models/update-current-user-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { Store } from '@ngrx/store';
import { SettingsForm } from '@settings/models/settings-form.model';
import { SettingsFromService } from '@settings/services/settings-from.service';
import { AuthActions, fromAuth } from '@store/auth';
import { fromSettings } from '@store/settings';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsFacade {
  constructor(private settingsFormService: SettingsFromService, private store: Store) {}

  public getSettingsForm$(): Observable<FormGroup<SettingsForm>> {
    this.settingsFormService.buildForm();
    return this.settingsFormService.getForm$();
  }

  public getCurrentUser$(): Observable<CurrentUser> {
    return this.store.select(fromAuth.currentUser).pipe(filter(Boolean));
  }

  public getIsSubmitting$(): Observable<boolean> {
    return this.store.select(fromSettings.isSubmitting);
  }

  public getValidationErrors$(): Observable<BackendErrors | null> {
    return this.store.select(fromSettings.validationErrors);
  }

  public dispatchUpdateCurrentUser(updateCurrentUserPayload: UpdateCurrentUserPayload): void {
    this.store.dispatch(AuthActions.updateCurrentUser({ updateCurrentUserPayload }));
  }
}
