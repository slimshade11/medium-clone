import { Injectable } from '@angular/core';
import { User } from '@auth/models/user.model';
import { AuthService } from '@auth/services/auth.service';
import { Store } from '@ngrx/store';
import { register } from '@store/auth/auth.actions';
import { user } from '@store/auth/auth.selectors';
import { Observable } from 'rxjs';

@Injectable()
export class AuthFacade {
  getUser$(): Observable<User> {
    return this.store.select(user);
  }

  constructor(private authService: AuthService, private store: Store) {}

  register(user: User): void {
    this.store.dispatch(register({ user }));
  }
}
