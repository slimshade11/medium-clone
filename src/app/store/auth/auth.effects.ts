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
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.REGISTER),
      tap(() => console.log(2)),
      switchMap((payload: RegisterPayload) => {
        return this.authService.register$(payload).pipe(
          map((currentUser: CurrentUser) => registerSuccess({ currentUser })),
          catchError(() => of(registerFailure()))
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
