import { Component } from '@angular/core';

@Component({
  selector: 'mc-root',
  template: `
    <div class="max-w-screen-xl mx-auto">
      <div class="menu">
        <mc-top-bar></mc-top-bar>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
