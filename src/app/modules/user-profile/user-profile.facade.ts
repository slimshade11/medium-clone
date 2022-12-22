import { Injectable } from '@angular/core';
import { ToastStatus } from '@core/enums/toast-status.enum';
import { ToastService } from '@core/services/toast.service';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fromUserProfile, UserProfileActions } from '@store/user-profile';
import { UserProfile } from '@user-profile/models/user-profile.model';
import { UserProfileService } from '@user-profile/services/user-profile.service';
import { map, switchMap, catchError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileFacade {
  constructor(
    private toastService: ToastService,
    private actions$: Actions,
    private userProfileService: UserProfileService,
    private store: Store
  ) {}

  // NgRx action dispatches //
  public dispatchGetUserProfile(slug: string): void {
    this.store.dispatch(UserProfileActions.getUserProfile({ slug }));
  }
  // NgRx action dispatches end //

  // NgRx selectors //
  public getUserProfile$(): Observable<UserProfile | null> {
    return this.store.select(fromUserProfile.userProfile);
  }

  public getIsLoading$(): Observable<boolean> {
    return this.store.select(fromUserProfile.isLoading);
  }

  public getError$(): Observable<string | null> {
    return this.store.select(fromUserProfile.error);
  }

  public getIsCurrentUserProfile$(): Observable<boolean> {
    return this.store.select(fromUserProfile.isCurrentUserProfile);
  }
  // NgRx selectors end //

  // NgRx effects //
  public getUserProfileEffect$() {
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
