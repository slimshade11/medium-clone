import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormService } from '@core/services/form.service';
import { SettingsForm } from '@settings/models/settings-form.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsFromService extends FormService {
  get config(): FormGroup<SettingsForm> {
    return this.fb.group({
      image: ['', [Validators.required]],
      username: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }) as FormGroup<SettingsForm>;
  }
}
