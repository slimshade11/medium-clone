import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from '@article/components/article/article.component';
import { CreateArticleComponent } from '@article/components/create-article/create-article.component';

const routes: Routes = [
  {
    path: 'article/new',
    component: CreateArticleComponent,
  },
  {
    path: 'article/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
