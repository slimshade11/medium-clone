import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '@auth/models/user.model';
import { AuthService } from '@auth/services/auth.service';
import { PersistanceService } from '@core/sevices/persistance.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTypes } from '@store/auth/action-types';
import { registerSuccess, registerFailure } from '@store/auth/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  public register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.REGISTER),
      switchMap(({ registerPayload }) => {
        return this.authService.register$(registerPayload).pipe(
          map((currentUser: CurrentUser) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => of(registerFailure({ errors: errorResponse.error.errors })))
        );
      })
    );
  });

  public redirectAfterSubmit = createEffect(
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
