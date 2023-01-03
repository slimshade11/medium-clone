import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FeedComponent } from '@shared/components/feed/feed.component';
import { UserProfileComponent } from '@user-profile/components/user-profile/user-profile.component';
import { UserProfile } from '@user-profile/models/user-profile.model';
import { UserProfileFacade } from '@user-profile/user-profile.facade';
import { Observable, of } from 'rxjs';

class MockUserProfileFacade {
  getIsLoading$(): Observable<boolean> {
    return of();
  }

  getError$(): Observable<string | null> {
    return of();
  }

  getIsCurrentUserProfile$(): Observable<boolean> {
    return of();
  }

  getUserProfile$(): Observable<UserProfile | null> {
    return of();
  }

  dispatchGetUserProfile(): void {}
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;
  let actions: Actions;
  let initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent, FeedComponent],
      imports: [MatSnackBarModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          privide: UserProfileFacade,
          useClass: MockUserProfileFacade,
        },
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    actions = TestBed.inject(Actions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
