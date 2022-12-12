import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getRange } from '@core/utils/get-range';

@Component({
  selector: 'mc-paginator',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ul class="flex flex-wrap justify-center max-w-full">
      <li *ngFor="let page of pages">
        <a
          [routerLink]="[url]"
          [queryParams]="{page}"
          [class.bg-indigo-300]="currentPage === page"
          class="block border rounded-sm border-indigo-900 hover:bg-indigo-300 p-3">
          {{ page }}
        </a>
      </li>
    </ul>
  `,
})
export class PaginatorComponent implements OnInit {
  @Input() total!: number;
  @Input() limit!: number;
  @Input() currentPage!: number;
  @Input() url!: string;

  public pagesCount: number = 0;
  public pages: Array<number> = [];

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages = getRange(1, this.pagesCount);
  }
}
