import { Component, OnInit } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { slider } from '@core/utils/route-animations';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/auth';

@Component({
  selector: 'mc-root',
  animations: [slider],
  template: `
    <mc-top-bar></mc-top-bar>
    <main
      [@routeAnimations]="prepareRoute(outlet)"
      class="main-content overflow-x-hidden">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
    <footer class="py-4 text-center bg-indigo-900 text-slate-100">2022 Medium-clone</footer>
  `,
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
