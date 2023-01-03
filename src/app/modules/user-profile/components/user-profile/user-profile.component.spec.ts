import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [MatSnackBarModule, RouterTestingModule],
      providers: [
        {
          privide: UserProfileFacade,
          useClass: MockUserProfileFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
