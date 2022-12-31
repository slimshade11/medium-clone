import { Component, Input } from '@angular/core';
import { FeedFacade } from '@app/modules/feed/feed.facade';
import { CurrentUser } from '@auth/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss'],
})
export class FeedTogglerComponent {
  @Input() tagName!: string;

  public isLoggedIn$: Observable<boolean | null> = this.feedFacade.getIsLoggedIn$();
  public currentUser$: Observable<CurrentUser | null> = this.feedFacade.getCurrentUser$();

  constructor(private feedFacade: FeedFacade) {}
}
