import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FeedFacade } from '@app/modules/feed/feed.facade';
import { GetFeedResponse } from '@app/modules/feed/models/get-feed-response.model';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import queryString from 'query-string';
import { map, Observable, takeUntil } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent extends DestroyComponent implements OnInit, OnChanges {
  @Input() apiUrl!: string;

  public feed$: Observable<GetFeedResponse | null> = this.feedFacade.getFeed$();
  public isLoading$: Observable<boolean> = this.feedFacade.getIsLoading$();
  public error$: Observable<string | null> = this.feedFacade.getError$();
  public isLoggedIn$: Observable<boolean | null> = this.feedFacade.getIsLoggedIn$();

  public limit: number = env.limit;
  public baseUrl: string = this.feedFacade.getBaseUrlFromEndpoint();
  public currentPage: number = 0;

  constructor(private feedFacade: FeedFacade, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.listenForCurrentPageChange();
  }

  ngOnChanges(changes: SimpleChanges) {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange && changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;
    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  private fetchFeed(): void {
    const offset: number = this.currentPage * this.limit - this.limit;
    const parsedApiUrl: queryString.ParsedUrl = queryString.parseUrl(this.apiUrl);

    console.log(this.apiUrl);

    const stringifiedParams: string = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedApiUrl.query,
    });
    const apiUrlWithParams: string = `${parsedApiUrl.url}?${stringifiedParams}`;

    this.feedFacade.dispatchGetFeed(apiUrlWithParams);
  }

  private listenForCurrentPageChange(): void {
    this.activatedRoute.queryParams
      .pipe(
        map((params: Params): string => params['page']),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (page): void => {
          this.currentPage = Number(page || '1');
          this.fetchFeed();
        },
      });
  }

  public onAddToFavourites(isFavorited: boolean, slug: string): void {
    this.feedFacade.dispatchAddToFavourites(isFavorited, slug);
  }
}
