import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-tag-list',
  template: `
    <ul class="flex items-center ">
      <li
        *ngFor="let tag of tagList"
        class="mr-2">
        <mat-chip disabled>{{ tag }}</mat-chip>
      </li>
    </ul>
  `,
})
export class TagListComponent {
  @Input() tagList!: Array<string>;
}
