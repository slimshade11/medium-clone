import { Injectable } from '@angular/core';
import { AuthFacade } from '@auth/auth.facade';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  public register$ = createEffect(() => {
    return this.authFacade.registerEffect$();
  });

  public redirectAfterRegisterSubmit$ = createEffect(
    () => {
      return this.authFacade.redirectAfterRegistration$();
    },
    { dispatch: false }
  );

  public login$ = createEffect(() => {
    return this.authFacade.loginEffect$();
  });

  public redirectAfterLoginSubmit$ = createEffect(
    () => {
      return this.authFacade.redirectAfterLoginEffect$();
    },
    { dispatch: false }
  );

  public getCurrentUser$ = createEffect(() => {
    return this.authFacade.getCurrentUserEffect$();
  });

  public updateCurrentUser$ = createEffect(() => {
    return this.authFacade.updateCurrentUserEffect$();
  });

  public logout$ = createEffect(
    () => {
      return this.authFacade.logoutEffect$();
    },
    { dispatch: false }
  );

  constructor(private authFacade: AuthFacade) {}
}
