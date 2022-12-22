import { Injectable } from '@angular/core';
import { PopularTagsFacade } from '@app/modules/popular-tags/popular-tags.facade';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class PopularTagsEffects {
  getPopularTags$ = createEffect(() => {
    return this.popularTagsFacade.getPopularTagsEffect$();
  });

  constructor(private popularTagsFacade: PopularTagsFacade) {}
}
