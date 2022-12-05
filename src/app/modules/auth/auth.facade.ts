import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormGroup } from '@auth/models/login-form.model';
import { LoginPayload } from '@auth/models/login-payload.model';
import { RegisterFormGroup } from '@auth/models/register-form.model';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { AuthService } from '@auth/services/auth.service';
import { LoginFormService } from '@auth/services/login-form.service';
import { RegisterFormService } from '@auth/services/register-form.service';
import { BackendErrors } from '@core/models/backend-errors.model';
import { Store } from '@ngrx/store';
import { login, register } from '@store/auth/auth.actions';
import { currentUser, errors, isLoading, isLoggedIn } from '@store/auth/auth.selectors';
import { Observable } from 'rxjs';

@Injectable()
export class AuthFacade {
  constructor(
    private registerFormService: RegisterFormService,
    private authService: AuthService,
    private loginFormService: LoginFormService,
    private store: Store
  ) {}

  public getCurrentUser$(): Observable<CurrentUser | null> {
    return this.store.select(currentUser);
  }

  public getIsLoading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  public getErrors$(): Observable<BackendErrors | null> {
    return this.store.select(errors);
  }

  public getIsLoggedIn$(): Observable<boolean | null> {
    return this.store.select(isLoggedIn);
  }

  public getRegisterForm$(): Observable<FormGroup<RegisterFormGroup>> {
    this.registerFormService.buildForm();
    return this.registerFormService.getForm$();
  }

  public getLoginForm$(): Observable<FormGroup<LoginFormGroup>> {
    this.loginFormService.buildForm();
    return this.loginFormService.getForm$();
  }

  public register(registerPayload: RegisterPayload): void {
    this.store.dispatch(register({ registerPayload }));
  }

  public login(loginPayload: LoginPayload): void {
    console.log(loginPayload);
    this.store.dispatch(login({ loginPayload }));
  }
}
