import { Component } from '@angular/core';

@Component({
  selector: 'mc-settings-view',
  template: `
    <mc-container>
      <router-outlet></router-outlet>
    </mc-container>
  `,
  styles: [],
})
export class SettingsViewComponent {}
