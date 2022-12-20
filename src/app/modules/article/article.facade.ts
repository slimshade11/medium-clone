import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleInitialValues } from '@article/models/article-initial-values.model';
import { CreateArticleForm } from '@article/models/create-article-form.model';
import { ArticleService } from '@article/services/article.service';
import { CreateArticleFormService } from '@article/services/create-article-form.service';
import { CreateArticleService } from '@article/services/create-article.service';
import { ToastStatus } from '@core/enums/toast-status.enum';
import { BackendErrors } from '@core/models/backend-errors.model';
import { ArticleService as SharedArticleService } from '@core/services/article.service';
import { ToastService } from '@core/services/toast.service';
import { Article } from '@feed/models/article.model';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ArticleActions, fromArticle } from '@store/article';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable()
export class ArticleFacade {
  constructor(
    private createArticleFormService: CreateArticleFormService,
    private createArticleService: CreateArticleService,
    private sharedArticleService: SharedArticleService,
    private articleService: ArticleService,
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private toastService: ToastService
  ) {}

  public getCreateArticleForm$(): Observable<FormGroup<CreateArticleForm>> {
    this.createArticleFormService.buildForm();
    return this.createArticleFormService.getForm$();
  }

  // NgRx action dispatches //
  public fetchArticleData(slug: string): void {
    this.store.dispatch(ArticleActions.getArticle({ slug }));
  }

  public dispatchDeleteArticle$(slug: string): void {
    this.store.dispatch(ArticleActions.deleteArticle({ slug }));
  }

  public createArticle$(createArticlePayload: ArticleInitialValues): Observable<Article> {
    return this.createArticleService.createArticle$(createArticlePayload);
  }

  public dispatchCreateArticle$(createArticlePayload: ArticleInitialValues): void {
    this.store.dispatch(ArticleActions.createArticle({ createArticlePayload }));
  }
  // NgRx action dispatches end //

  // NgRx Selectors //
  public getArticle$(): Observable<Article | null> {
    return this.store.select(fromArticle.article);
  }

  public getIsLoading$(): Observable<boolean> {
    return this.store.select(fromArticle.isLoading);
  }

  public getError$(): Observable<string | null> {
    return this.store.select(fromArticle.error);
  }

  public getIsAuthor$(): Observable<boolean> {
    return this.store.select(fromArticle.isAuthor);
  }

  public getIsSubmitting$(): Observable<boolean> {
    return this.store.select(fromArticle.isSubmitting);
  }

  public getValidationErrors$(): Observable<BackendErrors | null> {
    return this.store.select(fromArticle.validationErrors);
  }
  // NgRx Selectors end //

  // NgRx effects //
  public getArticleEffect$() {
    return this.actions$.pipe(
      ofType(ArticleActions.getArticle),
      switchMap(({ slug }) => {
        return this.sharedArticleService.loadArticle$(slug).pipe(
          map((article: Article) => {
            return ArticleActions.getArticleSuccess({ article });
          }),
          catchError(() => {
            return of(ArticleActions.getArticleFailure);
          })
        );
      })
    );
  }

  public deleteArticleEffect$() {
    return this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      switchMap(({ slug }) => {
        return this.articleService.deleteArticle$(slug).pipe(
          map(() => {
            this.toastService.showInfoMessage('Article successfully deleted', ToastStatus.SUCCESS, 'Ok');
            return ArticleActions.deleteArticleSuccess();
          }),
          catchError(() => {
            this.toastService.showInfoMessage('Error during deleting article', ToastStatus.WARN, 'Ok');
            return of(ArticleActions.deleteArticleFailure());
          })
        );
      })
    );
  }

  public redirectAfterArticleDeleteEffect$() {
    return this.actions$.pipe(
      ofType(ArticleActions.deleteArticleSuccess),
      tap((): void => {
        this.router.navigateByUrl('/');
      })
    );
  }

  public createArticleEffect$() {
    return this.actions$.pipe(
      ofType(ArticleActions.createArticle),
      switchMap(({ createArticlePayload }) => {
        return this.createArticleService.createArticle$(createArticlePayload).pipe(
          map((article: Article) => {
            return ArticleActions.createArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(ArticleActions.createArticleFailure({ errors: errorResponse.error.errors }));
          })
        );
      })
    );
  }

  public redirectAfterCreateArticle$() {
    return this.actions$.pipe(
      ofType(ArticleActions.createArticleSuccess),
      tap(({ article }): void => {
        this.router.navigate(['/articles/article', article.slug]);
      })
    );
  }
  // NgRx effects end //
}
