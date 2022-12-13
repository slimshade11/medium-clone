import { Injectable } from '@angular/core';
import { GetFeedResponse } from '@feed/models/get-feed-response.model';
import { FeedService } from '@feed/services/feed.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getFeed, getFeedFailure, getFeedSuccess } from '@store/feed/feed.actions';
import { map, switchMap, catchError, of } from 'rxjs';

@Injectable()
export class FeedEffects {
  getFeed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getFeed),
      switchMap(({ url }) => {
        return this.feedService.getFeed$(url).pipe(
          map((feed: GetFeedResponse) => {
            return getFeedSuccess({ feed });
          }),
          catchError(() => {
            return of(getFeedFailure());
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private feedService: FeedService) {}
}
