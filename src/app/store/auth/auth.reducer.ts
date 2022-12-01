import { User } from '@auth/models/user.model';
import { createReducer, on } from '@ngrx/store';
import { register } from '@store/auth/auth.actions';

export const featureKey = 'auth';

export interface State {
  user: User;
}

const initialState: State = {
  user: {
    name: '',
    displayName: '',
    email: '',
    password: '',
  },
};

export const reducer = createReducer(
  initialState,

  on(register, (state: State, { user }) => {
    return { ...state, user };
  })
);
