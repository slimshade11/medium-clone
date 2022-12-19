import { Injectable } from '@angular/core';
import { ArticleService } from '@core/services/article.service';
import { Article } from '@feed/models/article.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getArticle, getArticleSuccess, getArticleFailure } from '@store/article/article.actions';
import { map, switchMap, catchError, of } from 'rxjs';

@Injectable()
export class ArticleEffects {
  getArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getArticle),
      switchMap(({ slug }) => {
        return this.articleService.getArticle$(slug).pipe(
          map((article: Article) => {
            return getArticleSuccess({ article });
          }),
          catchError(() => {
            return of(getArticleFailure);
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private articleService: ArticleService) {}
}
