import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { isLoggedIn } from '@store/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss'],
})
export class FeedTogglerComponent {
  @Input() tagName!: string;

  constructor(private store: Store) {}

  public isLoggedIn$: Observable<boolean | null> = this.store.select(isLoggedIn);
}
