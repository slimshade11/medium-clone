import { Injectable } from '@angular/core';
import { ArticleFacade } from '@article/article.facade';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class ArticleEffects {
  getArticle$ = createEffect(() => {
    return this.articleFacade.getArticleEffect$();
  });

  deleteArticle$ = createEffect(
    () => {
      return this.articleFacade.deleteArticleEffect$();
    },
    { dispatch: false }
  );

  redirectAfterArticleDelete$ = createEffect(
    () => {
      return this.articleFacade.redirectAfterArticleDeleteEffect$();
    },
    { dispatch: false }
  );

  createArticle$ = createEffect(() => {
    return this.articleFacade.createArticleEffect$();
  });

  redirectAfterCreateArticle$ = createEffect(
    () => {
      return this.articleFacade.redirectAfterCreateArticle$();
    },
    { dispatch: false }
  );

  constructor(private articleFacade: ArticleFacade) {}
}
