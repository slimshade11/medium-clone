import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleForm } from '@article/models/article-form.model';
import { ArticleInitialValues } from '@article/models/article-initial-values.model';
import { SaveArticleResponse } from '@article/models/save-article-response.model';
import { ArticleFormService } from '@article/services/article-form.service';
import { ArticleService } from '@article/services/article.service';
import { CreateArticleService } from '@article/services/create-article.service';
import { EditArticleService } from '@article/services/edit-article.service';
import { ToastStatus } from '@core/enums/toast-status.enum';
import { BackendErrors } from '@core/models/backend-errors.model';
import { ArticleService as SharedArticleService } from '@core/services/article.service';
import { ToastService } from '@core/services/toast.service';
import { Article } from '@feed/models/article.model';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ArticleActions, fromArticle } from '@store/article';
import { ArticleEditActions, fromArticleEdit } from '@store/article-edit';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable()
export class ArticleFacade {
  constructor(
    private articleFormService: ArticleFormService,
    private createArticleService: CreateArticleService,
    private sharedArticleService: SharedArticleService,
    private articleService: ArticleService,
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private toastService: ToastService,
    private editArticleService: EditArticleService
  ) {}

  public getArticleForm$(): Observable<FormGroup<ArticleForm>> {
    this.articleFormService.buildForm();
    return this.articleFormService.getForm$();
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

  public dispatchCreateArticle(createArticlePayload: ArticleInitialValues): void {
    this.store.dispatch(ArticleActions.createArticle({ createArticlePayload }));
  }

  public dispatchEditArticle(slug: string, articleEditPayload: ArticleInitialValues): void {
    this.store.dispatch(ArticleEditActions.editArticle({ slug, articleEditPayload }));
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

  public getIsSubmittingArticleEdit$(): Observable<boolean> {
    return this.store.select(fromArticleEdit.isSubmitting);
  }

  public getIsLoadingArticleEdit$(): Observable<boolean> {
    return this.store.select(fromArticleEdit.isLoading);
  }

  public getArticleEdit$(): Observable<Article | null> {
    return this.store.select(fromArticleEdit.article);
  }

  public getValidationErrorsArticleEdit$(): Observable<BackendErrors | null> {
    return this.store.select(fromArticleEdit.validationErrors);
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
            this.toastService.showInfoMessage('Error during creating article', ToastStatus.WARN, 'Ok');
            return of(ArticleActions.createArticleFailure({ errors: errorResponse.error.errors }));
          })
        );
      })
    );
  }

  public redirectAfterCreateArticle$() {
    return this.actions$.pipe(
      ofType(ArticleActions.createArticleSuccess),
      tap(({ article }: SaveArticleResponse): void => {
        this.router.navigate(['/articles/article', article.slug]);
      })
    );
  }

  public getArticleEditEffect$() {
    return this.actions$.pipe(
      ofType(ArticleEditActions.getArticle),
      switchMap(({ slug }) => {
        return this.sharedArticleService.loadArticle$(slug).pipe(
          map((article: Article) => {
            return ArticleEditActions.getArticleSuccess({ article });
          }),
          catchError(() => {
            return of(ArticleEditActions.getArticleFailure());
          })
        );
      })
    );
  }

  public editArticleEffect$() {
    return this.actions$.pipe(
      ofType(ArticleEditActions.editArticle),
      switchMap(({ slug, articleEditPayload }) => {
        return this.editArticleService.editArticle$(slug, articleEditPayload).pipe(
          map((article: Article) => {
            this.toastService.showInfoMessage('Article successfully edited', ToastStatus.SUCCESS, 'Ok');
            return ArticleEditActions.editArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.toastService.showInfoMessage('Error during editing article', ToastStatus.WARN, 'Ok');
            return of(ArticleEditActions.editArticleFailure({ errors: errorResponse.error.errors }));
          })
        );
      })
    );
  }

  public redirectAfterEditArticle$() {
    return this.actions$.pipe(
      ofType(ArticleEditActions.editArticleSuccess),
      tap((): void => {
        this.router.navigate(['/']);
      })
    );
  }
  // NgRx effects end //
}
