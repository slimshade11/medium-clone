import { Component, OnInit } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCurrentUser } from '@store/auth/auth.actions';
import { slider } from './_core/constants/route-animations';

@Component({
  selector: 'mc-root',
  template: `
    <div class="max-w-screen-xl mx-auto px-3 xl:px-0">
      <div class="menu">
        <mc-top-bar></mc-top-bar>
      </div>
      <main
        [@routeAnimations]="prepareRoute(outlet)"
        class="content overflow-x-hidden">
        <router-outlet #outlet="outlet"></router-outlet>
      </main>
    </div>
  `,
  styles: ['.menu {  height: 72px}'],
  animations: [slider],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getCurrentUser());
  }

  prepareRoute(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
