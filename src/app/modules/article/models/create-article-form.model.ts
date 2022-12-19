import { FormControl } from '@angular/forms';

export interface CreateArticleForm {
  title: FormControl<string>;
  description: FormControl<string>;
  body: FormControl<string>;
  tagList: FormControl<string>;
}
