import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '@auth/models/user.model';
import { AuthService } from '@auth/services/auth.service';
import { ACCESSTOKEN } from '@core/constants/access-token';
import { PersistanceService } from '@core/services/persistance.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTypes } from '@store/auth/action-types';
import {
  registerSuccess,
  registerFailure,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  login,
  loginSuccess,
  loginFailure,
  getCurrentUser,
} from '@store/auth/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  public register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.REGISTER),
      switchMap(({ registerPayload }) => {
        return this.authService.register$(registerPayload).pipe(
          map((currentUser: CurrentUser) => {
            this.persistanceService.set(ACCESSTOKEN, currentUser.token);
            return registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailure({ errors: errorResponse.error.errors }));
          })
        );
      })
    );
  });

  public redirectAfterRegisterSubmit$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerSuccess),
        tap((): void => {
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  public login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(({ loginPayload }) => {
        return this.authService.login$(loginPayload).pipe(
          map((currentUser: CurrentUser) => {
            this.persistanceService.set(ACCESSTOKEN, currentUser.token);
            return loginSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailure({ errors: errorResponse.error.errors }));
          })
        );
      })
    );
  });

  public redirectAfterLoginSubmit$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((): void => {
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  public getCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCurrentUser),
      switchMap(() => {
        const token = this.persistanceService.get(ACCESSTOKEN);

        if (!token) {
          return of(getCurrentUserFailure());
        }

        return this.authService.getCurrentUser$().pipe(
          map((currentUser: CurrentUser) => {
            return getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => {
            return of(getCurrentUserFailure());
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
