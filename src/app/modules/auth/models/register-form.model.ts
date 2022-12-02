import { FormControl } from '@angular/forms';

export interface RegisterFormGroup {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
