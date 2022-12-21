import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArticleForm } from '@app/modules/article/models/article-form.model';
import { ArticleFacade } from '@article/article.facade';
import { ArticleInitialValues } from '@article/models/article-initial-values.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { takeUntil, Observable } from 'rxjs';

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
})
export class CreateArticleComponent extends DestroyComponent implements OnInit {
  public isSubmitting$: Observable<boolean> = this.articleFacade.getIsSubmitting$();
  public validationErrors$: Observable<BackendErrors | null> = this.articleFacade.getValidationErrors$();

  public form!: FormGroup<ArticleForm>;

  constructor(private articleFacade: ArticleFacade) {
    super();
  }

  ngOnInit(): void {
    this.articleFacade
      .getArticleForm$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<ArticleForm>): void => {
          this.form = form;
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

    this.articleFacade.dispatchCreateArticle(createArticlePayload);
  }
}
