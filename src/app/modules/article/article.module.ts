import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ArticleRoutingModule } from '@article/article-routing.module';
import { ArticleFacade } from '@article/article.facade';
import { ArticleComponent } from '@article/components/article/article.component';
import { CreateArticleComponent } from '@article/components/create-article/create-article.component';
import { CreateArticleFormService } from '@article/services/create-article-form.service';
import { AngularMaterialModules } from '@core/angular-material-modules/angular-material-modules';
import { SharedModule } from '@shared/shared.module';

const IMPORTS: Array<Type<any>> = [
  CommonModule,
  ArticleRoutingModule,
  ...AngularMaterialModules,
  SharedModule,
  ReactiveFormsModule,
];
const COMPONENTS: Array<Type<unknown>> = [ArticleComponent, CreateArticleComponent];
const PROVIDERS: Array<Type<unknown>> = [FormBuilder, ArticleFacade, CreateArticleFormService];
@NgModule({
  declarations: COMPONENTS,
  imports: IMPORTS,
  providers: PROVIDERS,
})
export class ArticleModule {}
