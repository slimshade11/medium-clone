import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ArticleRoutingModule } from '@article/article-routing.module';
import { ArticleComponent } from '@article/components/article/article.component';
import { AngularMaterialModules } from '@core/angular-material-modules/angular-material-modules';
import { SharedModule } from '@shared/shared.module';

export const IMPORTS: Array<Type<any>> = [CommonModule, ArticleRoutingModule, ...AngularMaterialModules, SharedModule];
export const COMPONENTS: Array<Type<unknown>> = [ArticleComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: IMPORTS,
})
export class ArticleModule {}
