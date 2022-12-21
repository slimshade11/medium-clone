import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UpdateCurrentUserPayload } from '@app/modules/auth/models/update-current-user-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { SettingsForm } from '@settings/models/settings-form.model';
import { SettingsFacade } from '@settings/settings.facade';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { combineLatest, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'mc-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent extends DestroyComponent implements OnInit {
  public isSubmitting$: Observable<boolean> = this.settingsFacade.getIsSubmitting$();
  public validationErrors$: Observable<BackendErrors | null> = this.settingsFacade.getValidationErrors$();

  public currentUser!: CurrentUser;
  public form!: FormGroup<SettingsForm>;

  constructor(private settingsFacade: SettingsFacade) {
    super();
  }

  ngOnInit(): void {
    combineLatest([this.settingsFacade.getCurrentUser$(), this.settingsFacade.getSettingsForm$()])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([currentUser, form]: [CurrentUser, FormGroup<SettingsForm>]): void => {
          this.form = form;
          this.currentUser = currentUser;

          this.patchValues(this.currentUser, this.form);
        },
      });
  }

  private patchValues(currentUser: CurrentUser, settingsForm: FormGroup<SettingsForm>): void {
    const dataToPatch = {
      image: currentUser.image!,
      username: currentUser.username!,
      bio: currentUser.bio ? currentUser.bio : '-',
      email: currentUser.email!,
      password: '',
    };

    settingsForm.patchValue(dataToPatch);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const updateCurrentUserPayload: UpdateCurrentUserPayload = {
      ...this.currentUser,
      image: this.form.value.image!,
      username: this.form.value.username!,
      bio: this.form.value.bio!,
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.settingsFacade.dispatchUpdateCurrentUser(updateCurrentUserPayload);
  }
}
