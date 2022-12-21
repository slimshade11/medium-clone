import { Injectable } from '@angular/core';
import { ArticleFacade } from '@article/article.facade';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class ArticleEditEffects {
  getArticle$ = createEffect(() => {
    return this.articleFacade.getArticleEditEffect$();
  });

  editArticle$ = createEffect(() => {
    return this.articleFacade.editArticleEffect$();
  });

  redirectAfterEditArticle$ = createEffect(
    () => {
      return this.articleFacade.redirectAfterEditArticle$();
    },
    { dispatch: false }
  );

  constructor(private articleFacade: ArticleFacade) {}
}
