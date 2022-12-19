import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateArticleForm } from '@article/models/create-article-form.model';
import { CreateArticleFormService } from '@article/services/create-article-form.service';
import { Article } from '@feed/models/article.model';
import { Store } from '@ngrx/store';
import { ArticleActions, fromArticle } from '@store/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacade {
  constructor(private createArticleFormService: CreateArticleFormService, private store: Store) {}

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

  public getCreateArticleForm$(): Observable<FormGroup<CreateArticleForm>> {
    this.createArticleFormService.buildForm();
    return this.createArticleFormService.getForm$();
  }

  public fetchArticleData(slug: string): void {
    this.store.dispatch(ArticleActions.getArticle({ slug }));
  }

  public deleteArticle(slug: string): void {
    this.store.dispatch(ArticleActions.deleteArticle({ slug }));
  }
}
