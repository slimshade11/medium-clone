import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthFacade } from '@auth/auth.facade';
import { LoginFormGroup } from '@auth/models/login-form.model';
import { LoginPayload } from '@auth/models/login-payload.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends DestroyComponent implements OnInit {
  public isLoading$: Observable<boolean> = this.authFacade.getIsLoading$();
  public errors$: Observable<BackendErrors | null> = this.authFacade.getErrors$();

  public form!: FormGroup<LoginFormGroup>;

  constructor(private authFacade: AuthFacade) {
    super();
  }

  ngOnInit(): void {
    this.authFacade
      .getLoginForm$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<LoginFormGroup>): void => {
          this.form = form;
        },
      });
  }

  public onSubmit(): void {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: LoginPayload = {
      user: {
        email: this.form.value.email!,
        password: this.form.value.password!,
      },
    };

    this.authFacade.login(payload);
  }

  get email() {
    return this.form.get('email') as FormControl<string>;
  }

  get password() {
    return this.form.get('password') as FormControl<string>;
  }
}
