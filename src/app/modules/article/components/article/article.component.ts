import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SLUG } from '@core/constants/slug';
import { Article } from '@feed/models/article.model';
import { Store } from '@ngrx/store';
import { ArticleActions, fromArticle } from '@store/article';
import { getArticle } from '@store/article/article.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  public article$: Observable<Article | null> = this.store.select(fromArticle.article);
  public isLoading$: Observable<boolean> = this.store.select(fromArticle.isLoading);
  public error$: Observable<string | null> = this.store.select(fromArticle.error);
  public isAuthor$: Observable<boolean> = this.store.select(fromArticle.isAuthor);

  private slug: string | null = this.activatedRoute.snapshot.paramMap.get(SLUG);

  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.store.dispatch(getArticle({ slug: this.slug! }));
  }

  public onDeleteArticle(): void {
    this.store.dispatch(ArticleActions.deleteArticle({ slug: this.slug! }));
  }
}
