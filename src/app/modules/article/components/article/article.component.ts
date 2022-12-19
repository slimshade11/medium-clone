import { Component, OnInit } from '@angular/core';
import { ArticleFacade } from '@article/article.facade';
import { getSlug } from '@core/utils/get-slug';
import { Article } from '@feed/models/article.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  public article$: Observable<Article | null> = this.articleFacade.getArticle$();
  public isLoading$: Observable<boolean> = this.articleFacade.getIsLoading$();
  public error$: Observable<string | null> = this.articleFacade.getError$();
  public isAuthor$: Observable<boolean> = this.articleFacade.getIsAuthor$();

  private slug: string | null = getSlug();

  constructor(private articleFacade: ArticleFacade) {}

  ngOnInit(): void {
    this.fetchData(this.slug!);
  }

  private fetchData(slug: string): void {
    this.articleFacade.fetchArticleData(slug);
  }

  public onDeleteArticle(): void {
    this.articleFacade.deleteArticle(this.slug!);
  }
}
