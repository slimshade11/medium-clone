import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentUser } from '@auth/models/user.model';
import { FeedTogglerComponent } from '@feed/components/feed-toggler/feed-toggler.component';
import { FeedFacade } from '@feed/feed.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

class MockFeedFacade {
  getIsLoggedIn$(): Observable<boolean | null> {
    return of();
  }

  getCurrentUser$(): Observable<CurrentUser | null> {
    return of();
  }
}

describe('FeedTogglerComponent', () => {
  let component: FeedTogglerComponent;
  let fixture: ComponentFixture<FeedTogglerComponent>;
  let initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedTogglerComponent],
      imports: [HttpClientTestingModule, MatCardModule, RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: FeedFacade,
          useClass: MockFeedFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
