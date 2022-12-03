import { FormControl } from '@angular/forms';

export interface RegisterFormGroup {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
