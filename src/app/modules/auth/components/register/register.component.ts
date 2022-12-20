import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthFacade } from '@auth/auth.facade';
import { RegisterFormGroup } from '@auth/models/register-form.model';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { takeUntil, Observable } from 'rxjs';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends DestroyComponent implements OnInit {
  public isLoading$: Observable<boolean> = this.authFacade.getIsLoading$();
  public errors$: Observable<BackendErrors | null> = this.authFacade.getErrors$();

  public form!: FormGroup<RegisterFormGroup>;

  constructor(private authFacade: AuthFacade) {
    super();
  }

  ngOnInit(): void {
    this.authFacade
      .getRegisterForm$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<RegisterFormGroup>): void => {
          this.form = form;
        },
      });
  }

  public onSubmit(): void {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const registerPayload: RegisterPayload = {
      user: {
        username: this.form.value.username!,
        email: this.form.value.email!,
        password: this.form.value.password!,
      },
    };

    this.authFacade.register(registerPayload);
  }

  get name() {
    return this.form.get('username') as FormControl<string>;
  }

  get email() {
    return this.form.get('email') as FormControl<string>;
  }

  get password() {
    return this.form.get('password') as FormControl<string>;
  }
}
