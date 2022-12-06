import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '@auth/auth.module';
import { FeedModule } from '@feed/feed.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<any> => import('@auth/auth.module').then(({ AuthModule }): AuthModule => AuthModule),
  },
  {
    path: 'feed',
    loadChildren: (): Promise<any> => import('@feed/feed.module').then(({ FeedModule }): FeedModule => FeedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
