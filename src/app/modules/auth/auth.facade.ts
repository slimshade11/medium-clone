import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormGroup } from '@auth/models/login-form.model';
import { LoginPayload } from '@auth/models/login-payload.model';
import { RegisterFormGroup } from '@auth/models/register-form.model';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { AuthService } from '@auth/services/auth.service';
import { LoginFormService } from '@auth/services/login-form.service';
import { RegisterFormService } from '@auth/services/register-form.service';
import { ACCESSTOKEN } from '@core/constants/access-token';
import { BackendErrors } from '@core/models/backend-errors.model';
import { PersistanceService } from '@core/services/persistance.service';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthActions, fromAuth } from '@store/auth';
import { login, register } from '@store/auth/auth.actions';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(
    private registerFormService: RegisterFormService,
    private loginFormService: LoginFormService,
    private store: Store,
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}

  public getLoginForm$(): Observable<FormGroup<LoginFormGroup>> {
    this.loginFormService.buildForm();
    return this.loginFormService.getForm$();
  }

  // NgRx Actions //
  public register(registerPayload: RegisterPayload): void {
    this.store.dispatch(register({ registerPayload }));
  }

  public login(loginPayload: LoginPayload): void {
    this.store.dispatch(login({ loginPayload }));
  }
  // NgRx Actions end //

  // NgRx Selectors //
  public getCurrentUser$(): Observable<CurrentUser | null> {
    return this.store.select(fromAuth.currentUser);
  }

  public getIsLoading$(): Observable<boolean> {
    return this.store.select(fromAuth.isLoading);
  }

  public getErrors$(): Observable<BackendErrors | null> {
    return this.store.select(fromAuth.errors);
  }

  public getIsLoggedIn$(): Observable<boolean | null> {
    return this.store.select(fromAuth.isLoggedIn);
  }

  public getRegisterForm$(): Observable<FormGroup<RegisterFormGroup>> {
    this.registerFormService.buildForm();
    return this.registerFormService.getForm$();
  }
  // NgRx Selectors end //

  // NgRx Effects //
  public registerEffect$ = () => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ registerPayload }) => {
        return this.authService.register$(registerPayload).pipe(
          map((currentUser: CurrentUser) => {
            this.persistanceService.set(ACCESSTOKEN, currentUser.token);
            return AuthActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(AuthActions.registerFailure({ errors: errorResponse.error.errors }));
          })
        );
      })
    );
  };

  public redirectAfterRegistration$ = () => {
    return this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap((): void => {
        this.router.navigateByUrl('/');
      })
    );
  };

  public loginEffect$ = () => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ loginPayload }) => {
        return this.authService.login$(loginPayload).pipe(
          map((currentUser: CurrentUser) => {
            this.persistanceService.set(ACCESSTOKEN, currentUser.token);
            return AuthActions.loginSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(AuthActions.loginFailure({ errors: errorResponse.error.errors }));
          })
        );
      })
    );
  };

  public redirectAfterLoginEffect$ = () => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((): void => {
        this.router.navigateByUrl('/');
      })
    );
  };

  public getCurrentUserEffect$ = () => {
    return this.actions$.pipe(
      ofType(AuthActions.getCurrentUser),
      switchMap(() => {
        const token = this.persistanceService.get(ACCESSTOKEN);

        if (!token) {
          return of(AuthActions.getCurrentUserFailure());
        }

        return this.authService.getCurrentUser$().pipe(
          map((currentUser: CurrentUser) => {
            return AuthActions.getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => {
            return of(AuthActions.getCurrentUserFailure());
          })
        );
      })
    );
  };
  // NgRx Effects end //
}
