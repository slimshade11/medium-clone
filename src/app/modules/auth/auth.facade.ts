import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterFormGroup } from '@auth/models/register-form.model';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { AuthService } from '@auth/services/auth.service';
import { BackendErrors } from '@core/models/backend-errors.model';
import { Store } from '@ngrx/store';
import { register } from '@store/auth/auth.actions';
import { currentUser, errors, isLoading, isLoggedIn } from '@store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { RegisterFormService } from './services/register-form.service';

@Injectable()
export class AuthFacade {
  constructor(
    private registerFormService: RegisterFormService,
    private authService: AuthService,
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

  public register(registerPayload: RegisterPayload): void {
    this.store.dispatch(register({ registerPayload }));
  }
}
