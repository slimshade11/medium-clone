import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-tag-list',
  template: `
    <mat-chip-listbox aria-label="Popular tag selection">
      <mat-chip
        *ngFor="let tag of tagList"
        class="mr-2"
        disabled>
        {{ tag }}
      </mat-chip>
    </mat-chip-listbox>
  `,
})
export class TagListComponent {
  @Input() tagList!: Array<string>;
}
