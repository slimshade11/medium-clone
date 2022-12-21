import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ArticleForm } from '@app/modules/article/models/article-form.model';
import { FormService } from '@core/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleFormService extends FormService {
  constructor() {
    super();
  }

  get config(): FormGroup<ArticleForm> {
    return this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      body: ['', [Validators.required]],
      tagList: ['', [Validators.required]],
    }) as FormGroup<ArticleForm>;
  }
}
