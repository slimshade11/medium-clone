import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetFeedResponse } from '@app/modules/feed/models/get-feed-response.model';
import { Store } from '@ngrx/store';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { fromFeed } from '@store/feed';
import { getFeed } from '@store/feed/feed.actions';
import queryString from 'query-string';
import { Observable, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent extends DestroyComponent implements OnInit {
  @Input() apiUrl!: string;

  public feed$: Observable<GetFeedResponse | null> = this.store.select(fromFeed.feedData);
  public isLoading$: Observable<boolean> = this.store.select(fromFeed.isLoading);
  public error$: Observable<string | null> = this.store.select(fromFeed.error);

  public limit: number = environment.limit;
  public baseUrl: string = this.getBaseUrlFromEndpoint(this.router);
  public currentPage: number = 0;

  constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.listenForCurrentPageChange();
  }

  private fetchFeed(): void {
    const offset: number = this.currentPage * this.limit - this.limit;
    const parsedApiUrl: queryString.ParsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams: string = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedApiUrl.query,
    });
    const apiUrlWithParams: string = `${parsedApiUrl.url}?${stringifiedParams}`;

    this.store.dispatch(getFeed({ url: apiUrlWithParams }));
  }

  private listenForCurrentPageChange(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: (params: Params): void => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
      },
    });
  }

  private getBaseUrlFromEndpoint(router: Router): string {
    return router.url.split('?')[0];
  }

  public onAddToFavourites(): void {}
}
