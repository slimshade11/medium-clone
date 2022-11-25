import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormService } from '@core/sevices/form.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService extends FormService {
  get config(): any {
    return {
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    };
  }
}
