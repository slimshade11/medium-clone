import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeedFacade } from '@app/modules/feed/feed.facade';
import { GetFeedResponse } from '@app/modules/feed/models/get-feed-response.model';
import { FeedComponent } from '@app/modules/shared/components/feed/feed.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

class MockFeedFacade {
  getFeed$(): Observable<GetFeedResponse | null> {
    return of();
  }

  getIsLoading$(): Observable<boolean> {
    return of();
  }

  getError$(): Observable<string | null> {
    return of();
  }

  getIsLoggedIn$(): Observable<boolean | null> {
    return of();
  }

  getBaseUrlFromEndpoint(): string {
    return '';
  }
}

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: FeedFacade,
          useClass: MockFeedFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
