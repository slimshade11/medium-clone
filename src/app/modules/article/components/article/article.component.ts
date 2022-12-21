import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleFacade } from '@article/article.facade';
import { EditArticleComponent } from '@article/dialogs/edit-article/edit-article.component';
import { getSlug } from '@core/utils/get-slug';
import { Article } from '@feed/models/article.model';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent extends DestroyComponent implements OnInit {
  public article$: Observable<Article | null> = this.articleFacade.getArticle$();
  private _article!: Article | null;
  public isLoading$: Observable<boolean> = this.articleFacade.getIsLoading$();
  public error$: Observable<string | null> = this.articleFacade.getError$();
  public isAuthor$: Observable<boolean> = this.articleFacade.getIsAuthor$();

  private slug: string | null = getSlug();

  constructor(private articleFacade: ArticleFacade, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.articleFacade.fetchArticleData(this.slug!);
    this.article$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (article: Article | null): void => {
        this._article = article;
      },
    });
  }

  public onDeleteArticle(): void {
    this.articleFacade.dispatchDeleteArticle$(this.slug!);
  }

  public onEditArticle(): void {
    this.dialog.open(EditArticleComponent, {
      data: { article: this._article },
    });
  }
}
