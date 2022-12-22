import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { UserProfileFacade } from '@user-profile/user-profile.facade';

@Injectable()
export class UserProfileEffects {
  getUserProfile$ = createEffect(() => {
    return this.userProfileFacade.getUserProfileEffect$();
  });

  constructor(private userProfileFacade: UserProfileFacade) {}
}
