import { Injectable } from '@angular/core';
import { FeedFacade } from '@feed/feed.facade';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class FeedEffects {
  getFeed$ = createEffect(() => {
    return this.feedFacade.getFeedEffect$();
  });

  constructor(private feedFacade: FeedFacade) {}
}
