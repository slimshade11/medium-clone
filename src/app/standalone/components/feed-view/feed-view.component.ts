import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed-view.component.html',
  styleUrls: ['./feed-view.component.scss'],
})
export class FeedViewComponent {}
