import { Component } from '@angular/core';
import { CurrentUser } from '@app/modules/auth/models/user.model';
import { Store } from '@ngrx/store';
import { currentUser, isAnonymous, isLoggedIn } from '@store/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  isLoggedIn$: Observable<boolean | null> = this.store.select(isLoggedIn);
  isAnonymous$: Observable<boolean> = this.store.select(isAnonymous);
  currentUser$: Observable<CurrentUser | null> = this.store.select(currentUser);

  constructor(private store: Store) {}
}
