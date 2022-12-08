import { RegisterFormGroup } from '@auth/models/register-form.model';

export type LoginFormGroup = Omit<RegisterFormGroup, 'username'>;
