import { Injectable } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { RegisterFormGroup } from '@auth/models/register-form.model';
import { FormService } from '@core/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService extends FormService {
  get config(): FormGroup<RegisterFormGroup> {
    return this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }) as FormGroup<RegisterFormGroup>;
  }
}
