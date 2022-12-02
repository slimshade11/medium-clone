import { Component, OnInit, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthFacade } from '@auth/auth.facade';
import { RegisterFormGroup } from '@auth/models/register-form.model';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { User } from '@auth/models/user.model';
import { RegisterFormService } from '@auth/services/register-form.service';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { takeUntil, Observable } from 'rxjs';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styles: [''],
  providers: [RegisterFormService],
})
export class RegisterComponent extends DestroyComponent implements OnInit {
  form!: FormGroup<RegisterFormGroup>;

  user$: Observable<User> = this.authFacade.getUser$();

  constructor(@Self() private registerFormService: RegisterFormService, private authFacade: AuthFacade) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerFormService.buildForm();
    this.registerFormService
      .getForm$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form) => (this.form = form),
      });
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: RegisterPayload = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.authFacade.register(payload);
  }
}
