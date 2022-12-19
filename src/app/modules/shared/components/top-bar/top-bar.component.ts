import { Component } from '@angular/core';
import { CurrentUser } from '@app/modules/auth/models/user.model';
import { Store } from '@ngrx/store';
import { fromAuth } from '@store/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  isLoggedIn$: Observable<boolean | null> = this.store.select(fromAuth.isLoggedIn);
  isAnonymous$: Observable<boolean> = this.store.select(fromAuth.isAnonymous);
  currentUser$: Observable<CurrentUser | null> = this.store.select(fromAuth.currentUser);

  constructor(private store: Store) {}
}
