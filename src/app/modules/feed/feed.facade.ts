import { Injectable } from '@angular/core';
import { FeedActions, fromFeed } from '@app/store/feed';
import { ToastService } from '@core/services/toast.service';
import { AddToFavouritesService } from '@feed/services/add-to-favourites.service';
import { FeedService } from '@feed/services/feed.service';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fromAuth } from '@store/auth';
import { addToFavourites, addToFavouritesSuccess, addToFavouritesFailure } from '@store/favourites/favourites.actions';
import { catchError, map, of, switchMap, Observable, iif } from 'rxjs';
import { Article } from './models/article.model';
import { GetFeedResponse } from './models/get-feed-response.model';

@Injectable({
  providedIn: 'root',
})
export class FeedFacade {
  constructor(
    private feedService: FeedService,
    private addToFavouritesService: AddToFavouritesService,
    private store: Store,
    private actions$: Actions,
    private toastService: ToastService
  ) {}

  public getBaseUrlFromEndpoint(): string {
    return this.feedService.getBaseUrlFromEndpoint();
  }

  // NgRx Selectors //
  public getIsLoading$(): Observable<boolean> {
    return this.store.select(fromFeed.isLoading);
  }

  public getError$(): Observable<string | null> {
    return this.store.select(fromFeed.error);
  }

  public getFeed$(): Observable<GetFeedResponse | null> {
    return this.store.select(fromFeed.feedData);
  }

  public getIsLoggedIn$(): Observable<boolean | null> {
    return this.store.select(fromAuth.isLoggedIn);
  }

  // NgRx Selectors end //

  // NgRx action dispatches //
  public dispatchGetFeed(apiUrlWithParams: string): void {
    this.store.dispatch(FeedActions.getFeed({ url: apiUrlWithParams }));
  }

  public dispatchAddToFavourites(isFavourited: boolean, slug: string): void {
    this.store.dispatch(addToFavourites({ isFavourited, slug }));
  }
  // NgRx action dispatches end //

  // NgRx effects //
  getFeedEffect$() {
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
  }

  addToFavouritesEffect$() {
    return this.actions$.pipe(
      ofType(addToFavourites),
      switchMap(({ isFavourited, slug }) => {
        return iif(
          () => isFavourited,
          this.addToFavouritesService.removeFromFavourites$(slug),
          this.addToFavouritesService.addToFavourites$(slug)
        ).pipe(
          map((article: Article) => {
            return addToFavouritesSuccess({ article });
          }),
          catchError(() => {
            return of(addToFavouritesFailure());
          })
        );
      })
    );
  }
  // NgRx effects end //
}
