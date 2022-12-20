import { Injectable } from '@angular/core';
import { fromPopularTags } from '@app/store/popular-tags';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PopularTagsService } from '@popular-tags/services/popular-tags.service';
import { PopularTagsActions } from '@store/popular-tags';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsFacade {
  constructor(private store: Store, private popularTagsService: PopularTagsService, private actions$: Actions) {}

  // NgRx selectors //
  public getPopularTags$(): Observable<Array<string> | null> {
    return this.store.select(fromPopularTags.popularTags);
  }

  public getError$(): Observable<string | null> {
    return this.store.select(fromPopularTags.error);
  }

  public getIsLoading$(): Observable<boolean> {
    return this.store.select(fromPopularTags.isLoading);
  }
  // NgRx selectors end//

  // NgRx action dispatches //
  public dispatchGetPopularTags(): void {
    this.store.dispatch(PopularTagsActions.getPopularTags());
  }
  // NgRx action dispatches end //

  //NgRx effects //
  getPopularTagsEffect$() {
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
  }
  //NgRx effects end //
}
