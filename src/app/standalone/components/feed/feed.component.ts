import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { GetFeedResponse } from '@feed/models/getFeedResponse.model';
import { Store } from '@ngrx/store';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { PaginatorComponent } from '@standalone/components/paginator/paginator.component';
import { SpinnerComponent } from '@standalone/components/spinner/spinner.component';
import { getFeed } from '@store/feed/feed.actions';
import { feedData, isLoading, error } from '@store/feed/feed.selectors';
import { Observable, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    RouterModule,
    SpinnerComponent,
    MatCardModule,
    MatButtonModule,
    PaginatorComponent,
  ],
  templateUrl: './feed.component.html',
})
export class FeedComponent extends DestroyComponent implements OnInit {
  @Input() apiUrl!: string;

  public feed$: Observable<GetFeedResponse | null> = this.store.select(feedData);
  public isLoading$: Observable<boolean> = this.store.select(isLoading);
  public error$: Observable<string | null> = this.store.select(error);

  public limit: number = environment.limit;
  public baseUrl: string = this.router.url.split('?')[0];
  public currentPage: number = 0;

  constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(getFeed({ url: this.apiUrl }));

    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: (params: Params): void => {
        this.currentPage = Number(params['page'] || '1');
      },
    });
  }
}
