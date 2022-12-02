import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthFacade } from '@auth/auth.facade';
import { RegisterFormGroup } from '@auth/models/register-form.model';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { takeUntil, Observable } from 'rxjs';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends DestroyComponent implements OnInit {
  public currentUser$: Observable<CurrentUser | null> = this.authFacade.getCurrentUser$();
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
        next: (form: FormGroup<RegisterFormGroup>) => (this.form = form),
      });
  }

  public onSubmit(): void {
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
