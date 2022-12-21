import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from '@app/modules/feed/models/article.model';
import { ArticleFacade } from '@article/article.facade';
import { ArticleForm } from '@article/models/article-form.model';
import { ArticleInitialValues } from '@article/models/article-initial-values.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './edit-article.component.html',
})
export class EditArticleComponent extends DestroyComponent implements OnInit {
  public isSubmitting$: Observable<boolean> = this.articleFacade.getIsSubmittingArticleEdit$();
  public validationErrors$: Observable<BackendErrors | null> = this.articleFacade.getValidationErrorsArticleEdit$();

  public form!: FormGroup<ArticleForm>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { article: Article },
    public dialogRef: MatDialogRef<EditArticleComponent>,
    private articleFacade: ArticleFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.articleFacade
      .getArticleForm$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<ArticleForm>): void => {
          this.form = form;
          this.patchValue(this.form, this.data.article);
        },
      });
  }

  patchValue(form: FormGroup<ArticleForm>, article: Article): void {
    const { title, description, body } = article;
    const articleDataToPatch = {
      title,
      description,
      body,
      tagList: article.tagList.join(' '),
    };

    form.patchValue(articleDataToPatch);
  }

  public onSubmit(): void {
    const articleEditPayload: ArticleInitialValues = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      body: this.form.value.body!,
      tagList: this.form.value.tagList!.split(' '),
    };

    this.articleFacade.dispatchEditArticle(this.data.article.slug, articleEditPayload);
    this.dialogRef.close();
  }
}
