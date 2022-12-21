import { Injectable } from '@angular/core';
import { FeedFacade } from '@feed/feed.facade';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class AddToFavouritesEffects {
  addToFavourites$ = createEffect(() => {
    return this.feedFacade.addToFavouritesEffect$();
  });

  constructor(private feedFacade: FeedFacade) {}
}
