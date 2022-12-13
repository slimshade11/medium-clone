import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PopularTagsService } from '@popular-tags/services/popular-tags.service';
import { getPopularTags, getPopularTagsFailure, getPopularTagsSuccess } from '@store/popular-tags/popular-tags.actions';
import { map, switchMap, catchError, of } from 'rxjs';

@Injectable()
export class PopularTagsEffects {
  getPopularTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPopularTags),
      switchMap(() => {
        return this.popularTagsService.getPopuplarTags$().pipe(
          map((popularTags: Array<string>) => {
            return getPopularTagsSuccess({ popularTags });
          }),
          catchError(() => {
            return of(getPopularTagsFailure());
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private popularTagsService: PopularTagsService) {}
}
