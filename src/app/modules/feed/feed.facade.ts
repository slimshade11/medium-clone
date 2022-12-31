import { Injectable } from '@angular/core';
import { FeedActions, fromFeed } from '@app/store/feed';
import { ToastStatus } from '@core/enums/toast-status.enum';
import { ToastService } from '@core/services/toast.service';
import { Article } from '@feed/models/article.model';
import { GetFeedResponse } from '@feed/models/get-feed-response.model';
import { AddToFavouritesService } from '@feed/services/add-to-favourites.service';
import { FeedService } from '@feed/services/feed.service';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fromAuth } from '@store/auth';
import { FavouritesActions } from '@store/favourites';
import { catchError, map, of, switchMap, Observable, iif } from 'rxjs';
import { CurrentUser } from '../auth/models/user.model';

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
  public getCurrentUser$(): Observable<CurrentUser | null> {
    return this.store.select(fromAuth.currentUser);
  }

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
    this.store.dispatch(FavouritesActions.addToFavourites({ isFavourited, slug }));
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
      ofType(FavouritesActions.addToFavourites),
      switchMap(({ isFavourited, slug }) => {
        return iif(
          () => isFavourited,
          this.addToFavouritesService.removeFromFavourites$(slug),
          this.addToFavouritesService.addToFavourites$(slug)
        ).pipe(
          map((article: Article) => {
            return FavouritesActions.addToFavouritesSuccess({ article });
          }),
          catchError(() => {
            this.toastService.showInfoMessage('Error during toggling favourites', ToastStatus.WARN, 'Ok');
            return of(FavouritesActions.addToFavouritesFailure());
          })
        );
      })
    );
  }
  // NgRx effects end //
}
