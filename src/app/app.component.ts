import { Component, OnInit } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { slider } from '@core/utils/route-animations';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/auth';

@Component({
  selector: 'mc-root',
  template: `
    <div class="menu">
      <mc-top-bar></mc-top-bar>
    </div>
    <main
      [@routeAnimations]="prepareRoute(outlet)"
      class="content overflow-x-hidden">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
    <div class="py-4 text-center bg-indigo-900 text-slate-100">2022 Medium-clone</div>
  `,
  styles: ['.menu {  height: 72px}; .content{min-height: calc(100vh - 124px)}'],
  animations: [slider],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.getCurrentUser());
  }

  public prepareRoute(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
