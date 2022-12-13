import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-spinner',
  template: `
    <div class="flex justify-center">
      <mat-spinner [diameter]="diameter"></mat-spinner>
    </div>
  `,
})
export class SpinnerComponent {
  @Input() diameter: number = 100;
}
