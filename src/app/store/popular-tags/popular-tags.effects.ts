import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PopularTagsService } from '@popular-tags/services/popular-tags.service';
import { PopularTagsActions } from '@store/popular-tags';
import { map, switchMap, catchError, of } from 'rxjs';

@Injectable()
export class PopularTagsEffects {
  getPopularTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PopularTagsActions.getPopularTags),
      switchMap(() => {
        return this.popularTagsService.getPopuplarTags$().pipe(
          map((popularTags: Array<string>) => {
            return PopularTagsActions.getPopularTagsSuccess({ popularTags });
          }),
          catchError(() => {
            return of(PopularTagsActions.getPopularTagsFailure());
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private popularTagsService: PopularTagsService) {}
}
