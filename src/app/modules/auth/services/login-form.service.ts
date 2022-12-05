import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormService } from '@core/sevices/form.service';
import { LoginFormGroup } from './../models/login-form.model';

@Injectable()
export class LoginFormService extends FormService {
  get config(): FormGroup<LoginFormGroup> {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }) as FormGroup<LoginFormGroup>;
  }
}
