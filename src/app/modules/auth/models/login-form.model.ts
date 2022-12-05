import { RegisterFormGroup } from './register-form.model';

export type LoginFormGroup = Omit<RegisterFormGroup, 'username'>;
