import { Component, OnInit } from '@angular/core';
import { getSelectedPopularTag } from '@core/utils/get-selected-popuplar-tag';
import { PopularTagsFacade } from '@popular-tags/popular-tags.facade';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'mc-popular-tags',
  template: `
    <mat-card>
      <mat-card-header>
        <h1>Popular tags</h1>
      </mat-card-header>
      <mat-card-content>
        <mc-spinner
          *ngIf="isLoading$ | async"
          [diameter]="30">
        </mc-spinner>
        <mat-error *ngIf="error$ | async as error">{{ error }}</mat-error>
        <mat-chip-listbox
          *ngIf="popularTags$ | async as popularTags"
          aria-label="Popular tags selection">
          <mat-chip-option
            *ngFor="let popularTag of popularTags"
            [routerLink]="['/tags', popularTag]"
            [selected]="selectedPopularTag === popularTag">
            {{ popularTag }}
          </mat-chip-option>
        </mat-chip-listbox>
      </mat-card-content>
    </mat-card>
  `,
})
export class PopularTagsComponent extends DestroyComponent implements OnInit {
  public popularTags$: Observable<Array<string> | null> = this.popularTagsFacade.getPopularTags$();
  public isLoading$: Observable<boolean> = this.popularTagsFacade.getIsLoading$();
  public error$: Observable<string | null> = this.popularTagsFacade.getError$();

  public selectedPopularTag: string = getSelectedPopularTag();

  constructor(private popularTagsFacade: PopularTagsFacade) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.popularTags$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (popularTags: Array<string> | null): void => {
        !popularTags && this.popularTagsFacade.dispatchGetPopularTags();
      },
    });
  }
}
