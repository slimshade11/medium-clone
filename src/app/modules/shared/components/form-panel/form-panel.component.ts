import { Component } from '@angular/core';

@Component({
  selector: 'mc-form-panel',
  template: `
    <mat-card>
      <mat-card-header class="text-xl">
        <ng-content select="mc-form-panel-header"></ng-content>
      </mat-card-header>
      <mat-card-content>
        <ng-content select="mc-form-panel-content"></ng-content>
      </mat-card-content>
    </mat-card>
  `,
})
export class FormPanelComponent {}
