import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'mc-spinner',
  template: `
    <div class="flex justify-center">
      <mat-spinner></mat-spinner>
    </div>
  `,
  imports: [MatProgressSpinnerModule],
  standalone: true,
})
export class SpinnerComponent {}
