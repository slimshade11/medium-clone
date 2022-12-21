import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromAuth } from '@store/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss'],
})
export class FeedTogglerComponent {
  @Input() tagName!: string;

  public isLoggedIn$: Observable<boolean | null> = this.store.select(fromAuth.isLoggedIn);

  constructor(private store: Store) {}
}
