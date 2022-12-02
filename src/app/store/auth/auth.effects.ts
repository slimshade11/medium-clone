import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { AuthService } from '@auth/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTypes } from '@store/auth/action-types';
import { registerSuccess, registerFailure } from '@store/auth/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.REGISTER),
      switchMap((payload: RegisterPayload) => {
        return this.authService.register$(payload).pipe(
          tap(() => console.log(payload)),
          map((currentUser: CurrentUser) => registerSuccess({ currentUser })),
          catchError((errorResponse: HttpErrorResponse) => of(registerFailure({ errors: errorResponse.error.errors })))
        );
      })
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
