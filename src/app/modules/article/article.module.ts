import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ArticleRoutingModule } from '@article/article-routing.module';
import { ArticleComponent } from '@article/components/article/article.component';

export const IMPORTS: Array<Type<unknown>> = [CommonModule, ArticleRoutingModule];
export const COMPONENTS: Array<Type<unknown>> = [ArticleComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: IMPORTS,
})
export class ArticleModule {}
