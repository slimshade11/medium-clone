import { Injectable } from '@angular/core';
import { GetFeedResponse } from '@app/modules/feed/models/getFeedResponse.model';
import { FeedService } from '@core/sevices/feed.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getFeed, getFeedFailure, getFeedSuccess } from '@store/feed/feed.actions';
import { map, switchMap, catchError, of } from 'rxjs';

@Injectable()
export class GetFeedEffect {
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
