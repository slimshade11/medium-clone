import { Injectable } from '@angular/core';
import { GetFeedResponse } from '@feed/models/get-feed-response.model';
import { FeedService } from '@feed/services/feed.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeedActions } from '@store/feed';
import { map, switchMap, catchError, of } from 'rxjs';

@Injectable()
export class FeedEffects {
  getFeed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeedActions.getFeed),
      switchMap(({ url }) => {
        return this.feedService.loadFeed$(url).pipe(
          map((feed: GetFeedResponse) => {
            return FeedActions.getFeedSuccess({ feed });
          }),
          catchError(() => {
            return of(FeedActions.getFeedFailure());
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private feedService: FeedService) {}
}
