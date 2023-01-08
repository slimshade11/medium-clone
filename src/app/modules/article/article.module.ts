import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ArticleRoutingModule } from '@article/article-routing.module';
import { ArticleFacade } from '@article/article.facade';
import { ArticleComponent } from '@article/components/article/article.component';
import { CreateArticleComponent } from '@article/components/create-article/create-article.component';
import { EditArticleComponent } from '@article/dialogs/edit-article/edit-article.component';
import { ArticleFormService } from '@article/services/article-form.service';
import { CreateArticleService } from '@article/services/create-article.service';
import { SharedModule } from '@shared/shared.module';
import { BackendErrorMessagesComponent } from '@standalone/components/backend-error-messages/backend-error-messages.component';

const IMPORTS: Array<any> = [
  CommonModule,
  ArticleRoutingModule,
  SharedModule,
  ReactiveFormsModule,
  BackendErrorMessagesComponent,
];
const COMPONENTS: Array<any> = [ArticleComponent, CreateArticleComponent, EditArticleComponent];
const PROVIDERS: Array<any> = [FormBuilder, ArticleFacade, ArticleFormService, CreateArticleService];
@NgModule({
  declarations: COMPONENTS,
  imports: IMPORTS,
  providers: PROVIDERS,
})
export class ArticleModule {}
