import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentUser } from '@auth/models/user.model';
import { FeedTagComponent } from '@feed/components/feed-tag/feed-tag.component';
import { FeedTogglerComponent } from '@feed/components/feed-toggler/feed-toggler.component';
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

  getBaseUrlFromEndpoint(): string {
    return '';
  }
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

describe('FeedTagComponent', () => {
  let component: FeedTagComponent;
  let fixture: ComponentFixture<FeedTagComponent>;
  let initialState = {};

  beforeEach(() => MockBuilder(ContainerComponent));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedTagComponent, BannerComponent, FeedTogglerComponent, FeedComponent, PopularTagsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatCardModule],
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

    fixture = TestBed.createComponent(FeedTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
