import { Component } from '@angular/core';

@Component({
  selector: 'mc-user-profile-view',
  template: `
    <mc-container>
      <router-outlet></router-outlet>
    </mc-container>
  `,
})
export class UserProfileViewComponent {}
