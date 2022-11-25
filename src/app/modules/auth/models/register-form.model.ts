import { FormControl } from '@angular/forms';

export interface RegisterForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
