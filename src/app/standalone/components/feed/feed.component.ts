import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { GetFeedResponse } from '@app/modules/feed/models/getFeedResponse.model';
import { Store } from '@ngrx/store';
import { SpinnerComponent } from '@standalone/components/spinner/spinner.component';
import { getFeed } from '@store/feed/feed.actions';
import { feedData, isLoading, error } from '@store/feed/feed.selectors';
import { Observable } from 'rxjs';

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
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl!: string;

  feed$: Observable<GetFeedResponse | null> = this.store.select(feedData);
  isLoading$: Observable<boolean> = this.store.select(isLoading);
  error$: Observable<string | null> = this.store.select(error);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getFeed({ url: this.apiUrl }));
  }
}
