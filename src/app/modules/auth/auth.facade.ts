import { Injectable } from '@angular/core';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { User } from '@auth/models/user.model';
import { AuthService } from '@auth/services/auth.service';
import { Store } from '@ngrx/store';
import { register } from '@store/auth/auth.actions';
import { isLoading, user } from '@store/auth/auth.selectors';
import { Observable } from 'rxjs';

@Injectable()
export class AuthFacade {
  public getUser$(): Observable<User> {
    return this.store.select(user);
  }

  public getIsLoading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  constructor(private authService: AuthService, private store: Store) {}

  public register(payload: RegisterPayload): void {
    this.store.dispatch(register({ payload }));
  }
}
