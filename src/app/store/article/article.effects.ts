import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '@article/services/article.service';
import { ArticleService as SharedArticleService } from '@core/services/article.service';
import { Article } from '@feed/models/article.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticleActions } from '@store/article';
import { map, switchMap, catchError, of, tap } from 'rxjs';

@Injectable()
export class ArticleEffects {
  getArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.getArticle),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle$(slug).pipe(
          map((article: Article) => {
            return ArticleActions.getArticleSuccess({ article });
          }),
          catchError(() => {
            return of(ArticleActions.getArticleFailure);
          })
        );
      })
    );
  });

  deleteArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      switchMap(({ slug }) => {
        return this.articleService.deleteArticle$(slug).pipe(
          map(() => {
            return ArticleActions.deleteArticleSuccess();
          }),
          catchError(() => {
            return of(ArticleActions.deleteArticleFailure());
          })
        );
      })
    );
  });

  redirectAfterArticleDelete$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ArticleActions.deleteArticleSuccess),
        tap((): void => {
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
    private articleService: ArticleService,
    private router: Router
  ) {}
}
