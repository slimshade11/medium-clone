import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SLUG } from '@core/constants/slug';
import { Store } from '@ngrx/store';
import { getArticle } from '@store/article/article.actions';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  slug: string | null = this.activatedRoute.snapshot.paramMap.get(SLUG);

  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.store.dispatch(getArticle({ slug: this.slug! }));
  }
}
