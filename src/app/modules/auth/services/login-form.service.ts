import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { LoginFormGroup } from '@auth/models/login-form.model';
import { FormService } from '@core/services/form.service';

@Injectable()
export class LoginFormService extends FormService {
  get config(): FormGroup<LoginFormGroup> {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }) as FormGroup<LoginFormGroup>;
  }
}
