import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentUser } from '@auth/models/user.model';
import { FeedTogglerComponent } from '@feed/components/feed-toggler/feed-toggler.component';
import { FeedViewComponent } from '@feed/components/feed-view/feed-view.component';
import { FeedFacade } from '@feed/feed.facade';
import { GetFeedResponse } from '@feed/models/get-feed-response.model';
import { provideMockStore } from '@ngrx/store/testing';
import { PopularTagsComponent } from '@popular-tags/components/popular-tags/popular-tags.component';
import { PopularTagsFacade } from '@popular-tags/popular-tags.facade';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { ContainerComponent } from '@shared/components/container/container.component';
import { FeedComponent } from '@shared/components/feed/feed.component';
import { MockBuilder } from 'ng-mocks';
import { Observable, of } from 'rxjs';

class MockFeedFacade {
  getIsLoggedIn$(): Observable<boolean> {
    return of();
  }

  getCurrentUser$(): Observable<CurrentUser | null> {
    return of();
  }

  getFeed$(): Observable<GetFeedResponse | null> {
    return of();
  }

  getIsLoading$(): Observable<boolean> {
    return of();
  }

  getError$(): Observable<string | null> {
    return of();
  }

  getBaseUrlFromEndpoint(): void {}
}

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

describe('FeedViewComponent', () => {
  let component: FeedViewComponent;
  let fixture: ComponentFixture<FeedViewComponent>;
  let initialState = {};

  beforeEach(() => {
    return MockBuilder(ContainerComponent);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedViewComponent, BannerComponent, FeedTogglerComponent, FeedComponent, PopularTagsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MatCardModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: FeedFacade,
          useClass: MockFeedFacade,
        },
        {
          provide: PopularTagsFacade,
          useClass: MockPopularTagsFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
