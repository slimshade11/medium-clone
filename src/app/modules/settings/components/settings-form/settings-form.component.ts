import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  public isSubitting$: Observable<boolean> = this.settingsFacade.getIsSubmitting$();
  public validationErrors: Observable<BackendErrors | null> = this.settingsFacade.getValidationErrors$();
  public currentUser$: Observable<CurrentUser> = this.settingsFacade.getCurrentUser$();
  private _currentUser!: CurrentUser;

  public form!: FormGroup<SettingsForm>;

  constructor(private settingsFacade: SettingsFacade) {
    super();
  }

  ngOnInit(): void {
    combineLatest([this.settingsFacade.getCurrentUser$(), this.settingsFacade.getSettingsForm$()])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([currentUser, form]: [CurrentUser, FormGroup<SettingsForm>]) => {
          this._currentUser = currentUser;
          this.form = form;
          this.patchValues(this._currentUser, this.form);
        },
      });
  }

  private patchValues(currentUser: CurrentUser, form: FormGroup<SettingsForm>): void {
    const dataToPatch = {
      image: currentUser.image!,
      username: currentUser.username!,
      bio: currentUser.bio!,
      email: currentUser.email!,
      password: '',
    };

    form.patchValue(dataToPatch);
  }

  public onSubmit(): void {
    console.log(this.form.value);
  }
}
