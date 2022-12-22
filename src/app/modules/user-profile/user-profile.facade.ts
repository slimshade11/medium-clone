import { Injectable } from '@angular/core';
import { ToastStatus } from '@core/enums/toast-status.enum';
import { ToastService } from '@core/services/toast.service';
import { Actions, ofType } from '@ngrx/effects';
import { UserProfileActions } from '@store/user-profile';
import { UserProfile } from '@user-profile/models/user-profile.model';
import { UserProfileService } from '@user-profile/services/user-profile.service';
import { map, switchMap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileFacade {
  constructor(
    private toastService: ToastService,
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {}

  // NgRx effects //

  // EffectResult<Action>
  getUserProfileEffect$() {
    return this.actions$.pipe(
      ofType(UserProfileActions.getUserProfile),
      switchMap(({ slug }) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfile) => {
            return UserProfileActions.getUserProfileSuccess({ userProfile });
          }),
          catchError(() => {
            this.toastService.showInfoMessage('Error during loading user data', ToastStatus.WARN, 'Ok');
            return of(UserProfileActions.getUserProfileFailure());
          })
        );
      })
    );
  }

  // NgRx effects end //
}
