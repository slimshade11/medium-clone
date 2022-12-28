import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SLUG } from '@core/constants/slug';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { map, Observable, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'mc-feed-tag',
  templateUrl: './feed-tag.component.html',
})
export class FeedTagComponent extends DestroyComponent {
  public tagName$: Observable<string | null> = this.getTagNameFromUrl$();
  public apiUrl!: string;

  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  getTagNameFromUrl$(): Observable<string | null> {
    return this.activatedRoute.paramMap.pipe(
      map((params: ParamMap): string | null => params.get(SLUG)),
      tap((tagName: string | null): void => {
        this.apiUrl = `/articles?tag=${tagName}`;
      }),
      takeUntil(this.destroy$)
    );
  }
}
