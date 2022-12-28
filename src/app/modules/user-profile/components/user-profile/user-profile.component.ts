import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DestroyComponent } from '@app/standalone/components/destroy/destroy.component';
import { getSlug } from '@core/utils/get-slug';
import { getUserProfileApiUrl } from '@core/utils/get-user-profile-api-url';
import { UserProfile } from '@user-profile/models/user-profile.model';
import { UserProfileFacade } from '@user-profile/user-profile.facade';
import { Observable, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent extends DestroyComponent implements OnInit {
  public isLoading$: Observable<boolean> = this.userProfileFacade.getIsLoading$();
  public error$: Observable<string | null> = this.userProfileFacade.getError$();
  public isCurrentUserProfile$: Observable<boolean> = this.userProfileFacade.getIsCurrentUserProfile$();
  private _userProfile$: Observable<UserProfile | null> = this.userProfileFacade.getUserProfile$();
  public userProfile!: UserProfile | null;
  public slug: string | null = getSlug();
  public apiUrl: string = getUserProfileApiUrl(this.slug!);

  constructor(private userProfileFacade: UserProfileFacade, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeListeners();
  }

  initializeListeners(): void {
    this._userProfile$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (userProfile: UserProfile | null): void => {
        this.userProfile = userProfile;
      },
    });

    this.activatedRoute.params
      .pipe(
        tap(({ slug }: Params): void => {
          this.userProfileFacade.dispatchGetUserProfile(slug);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
