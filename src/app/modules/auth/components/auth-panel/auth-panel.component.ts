import { Component } from '@angular/core';

@Component({
  selector: 'mc-auth-panel',
  template: `
    <mat-card>
      <mat-card-header class="text-xl">
        <ng-content select="mc-auth-panel-header"></ng-content>
      </mat-card-header>
      <mat-card-content>
        <ng-content select="mc-auth-panel-content"></ng-content>
      </mat-card-content>
    </mat-card>
  `,
  styles: [''],
})
export class AuthPanelComponent {}
