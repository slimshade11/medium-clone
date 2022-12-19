import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CreateArticleForm } from '@article/models/create-article-form.model';
import { FormService } from '@core/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class CreateArticleFormService extends FormService {
  constructor() {
    super();
  }

  get config(): FormGroup<CreateArticleForm> {
    return this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      body: ['', [Validators.required]],
      tagList: ['', [Validators.required]],
    }) as FormGroup<CreateArticleForm>;
  }
}
