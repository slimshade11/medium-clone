import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUser } from '@auth/models/user.model';
import { AuthService } from '@auth/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTypes } from '@store/auth/action-types';
import { registerSuccess, registerFailure } from '@store/auth/auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.REGISTER),
      switchMap(({ registerPayload }) => {
        return this.authService.register$(registerPayload).pipe(
          map((currentUser: CurrentUser) => registerSuccess({ currentUser })),
          catchError((errorResponse: HttpErrorResponse) => of(registerFailure({ errors: errorResponse.error.errors })))
        );
      })
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
