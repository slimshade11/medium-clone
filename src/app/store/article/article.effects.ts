import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleFacade } from '@article/article.facade';
import { Actions, createEffect } from '@ngrx/effects';

@Injectable()
export class ArticleEffects {
  getArticle$ = createEffect(() => this.articleFacade.getArticleEffect$());

  deleteArticle$ = createEffect(() => this.articleFacade.deleteArticleEffect$());

  redirectAfterArticleDelete$ = createEffect(() => this.articleFacade.redirectAfterArticleDeleteEffect$(), {
    dispatch: false,
  });

  createArticle$ = createEffect(() => this.articleFacade.createArticleEffect$());

  redirectAfterCreateArticle$ = createEffect(() => this.articleFacade.redirectAfterCreateArticle$(), {
    dispatch: false,
  });

  constructor(private actions$: Actions, private articleFacade: ArticleFacade, private router: Router) {}
}
