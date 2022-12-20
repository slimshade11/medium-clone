import { Injectable } from '@angular/core';
import { ArticleFacade } from '@article/article.facade';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class EditArticleEffects {
  getArticle$ = createEffect(() => {
    return this.articleFacade.getArticleEdit$();
  });

  editArticle$ = createEffect(() => {
    return this.articleFacade.editArticle$();
  });

  redirectAfterEditArticle$ = createEffect(
    () => {
      return this.articleFacade.redirectAfterEditArticle$();
    },
    { dispatch: false }
  );

  constructor(private articleFacade: ArticleFacade) {}
}
