import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PopularTagsFacade } from '@popular-tags/popular-tags.facade';
import { ContainerComponent } from '@shared/components/container/container.component';
import { UserProfile } from '@user-profile/models/user-profile.model';
import { UserProfileViewComponent } from '@user-profile/user-profile-view/user-profile-view.component';
import { UserProfileFacade } from '@user-profile/user-profile.facade';
import { MockBuilder } from 'ng-mocks';
import { Observable, of } from 'rxjs';

class MockPopularTagsFacade {
  getPopularTags$(): Observable<Array<string> | null> {
    return of();
  }

  getIsLoading$(): Observable<boolean> {
    return of();
  }

  getError$(): Observable<string | null> {
    return of();
  }
}

class MockUserProfileFacade {
  public dispatchGetUserProfile(): void {}

  public getUserProfile$(): Observable<UserProfile | null> {
    return of();
  }

  public getIsLoading$(): Observable<boolean> {
    return of();
  }

  public getError$(): Observable<string | null> {
    return of();
  }

  public getIsCurrentUserProfile$(): Observable<boolean> {
    return of();
  }
}

describe('UserProfileViewComponent', () => {
  let component: UserProfileViewComponent;
  let fixture: ComponentFixture<UserProfileViewComponent>;

  beforeEach(() => MockBuilder(ContainerComponent));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileViewComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: PopularTagsFacade, useClass: MockPopularTagsFacade },
        {
          provide: UserProfileFacade,
          useClass: MockUserProfileFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
