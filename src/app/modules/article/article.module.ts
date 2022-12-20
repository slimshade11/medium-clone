import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ArticleRoutingModule } from '@article/article-routing.module';
import { ArticleFacade } from '@article/article.facade';
import { ArticleComponent } from '@article/components/article/article.component';
import { CreateArticleComponent } from '@article/components/create-article/create-article.component';
import { CreateArticleFormService } from '@article/services/create-article-form.service';
import { CreateArticleService } from '@article/services/create-article.service';
import { AngularMaterialModules } from '@core/angular-material-modules/angular-material-modules';
import { SharedModule } from '@shared/shared.module';
import { BackendErrorMessagesComponent } from '@standalone/components/backend-error-messages/backend-error-messages.component';

const IMPORTS: Array<Type<any>> = [
  CommonModule,
  ArticleRoutingModule,
  ...AngularMaterialModules,
  SharedModule,
  ReactiveFormsModule,
  BackendErrorMessagesComponent,
];
const COMPONENTS: Array<Type<unknown>> = [ArticleComponent, CreateArticleComponent];
const PROVIDERS: Array<Type<unknown>> = [FormBuilder, ArticleFacade, CreateArticleFormService, CreateArticleService];
@NgModule({
  declarations: COMPONENTS,
  imports: IMPORTS,
  providers: PROVIDERS,
})
export class ArticleModule {}
