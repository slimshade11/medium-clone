import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArticleFacade } from '@article/article.facade';
import { ArticleInitialValues } from '@article/models/article-initial-values.model';
import { CreateArticleForm } from '@article/models/create-article-form.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { takeUntil } from 'rxjs';

const mockedValue = {
  title: 'dupa',
  description: 'dupa zbita',
  body: 'dupa zbita bardzo bardzo',
  tagList: ['dupa zbita bardzo bardzo hej hej'].join(' '),
};

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent extends DestroyComponent implements OnInit {
  @Input() initialValues!: ArticleInitialValues;
  @Input() isSubmitting!: boolean;
  @Input() errors!: BackendErrors | null;

  @Output() articleSubmit: EventEmitter<ArticleInitialValues> = new EventEmitter<ArticleInitialValues>();

  public form!: FormGroup<CreateArticleForm>;

  constructor(private articleFacade: ArticleFacade) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.articleFacade
      .getCreateArticleForm$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<CreateArticleForm>): void => {
          this.form = form;
          this.form.patchValue(mockedValue);
        },
      });
  }

  public onSubmit(): void {
    console.log(this.form.value);
  }
}
