import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SLUG } from '@core/constants/slug';

@Component({
  selector: 'mc-feed-tag',
  templateUrl: './feed-tag.component.html',
})
export class FeedTagComponent {
  public tagName: string | null = this.activatedRoute.snapshot.paramMap.get(SLUG);
  public apiUrl: string = `/articles?tag=${this.tagName}`;

  constructor(private activatedRoute: ActivatedRoute) {}
}
