import { Component } from '@angular/core';

@Component({
  selector: 'mc-feed-view',
  templateUrl: './feed-view.component.html',
})
export class FeedViewComponent {
  public readonly apiUrl = '/articles';
}
