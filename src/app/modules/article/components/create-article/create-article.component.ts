import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArticleFacade } from '@article/article.facade';
import { ArticleInitialValues } from '@article/models/article-initial-values.model';
import { CreateArticleForm } from '@article/models/create-article-form.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { takeUntil, Observable } from 'rxjs';

const initialValues = {
  title: '',
  description: '',
  body: '',
  tagList: [],
};

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent extends DestroyComponent implements OnInit {
  public isSubmitting$: Observable<boolean> = this.articleFacade.getIsSubmitting$();
  public validationErrors$: Observable<BackendErrors | null> = this.articleFacade.getValidationErrors$();

  public form!: FormGroup<CreateArticleForm>;

  constructor(private articleFacade: ArticleFacade) {
    super();
  }

  ngOnInit(): void {
    this.articleFacade
      .getCreateArticleForm$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<CreateArticleForm>): void => {
          this.form = form;
          this.form.patchValue({
            title: initialValues.title,
            description: initialValues.description,
            body: initialValues.body,
            tagList: initialValues.tagList.join(' '),
          });
        },
      });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const createArticlePayload: ArticleInitialValues = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      body: this.form.value.body!,
      tagList: this.form.value.tagList!.split(' '),
    };

    this.articleFacade.dispatchCreateArticle$(createArticlePayload);
  }
}
