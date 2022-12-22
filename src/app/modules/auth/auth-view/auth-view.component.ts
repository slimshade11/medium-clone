import { Component } from '@angular/core';

@Component({
  selector: 'mc-auth-view',
  template: `
    <mc-container>
      <router-outlet></router-outlet>
    </mc-container>
  `,
})
export class AuthViewComponent {}
