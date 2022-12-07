import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'mc-spinner',
  template: `
    <div class="flex justify-center items-center h-full">
      <mat-spinner></mat-spinner>
    </div>
  `,
  imports: [MatProgressSpinnerModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
