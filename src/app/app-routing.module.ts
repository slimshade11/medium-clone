import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleModule } from '@article/article.module';
import { AuthModule } from '@auth/auth.module';
import { FeedModule } from '@feed/feed.module';
import { SettingsModule } from '@settings/settings.module';
import { UserProfileModule } from '@user-profile/user-profile.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<any> => import('@feed/feed.module').then(({ FeedModule }): FeedModule => FeedModule),
    data: {
      animation: 'isLeft',
    },
  },
  {
    path: 'auth',
    loadChildren: (): Promise<any> => import('@auth/auth.module').then(({ AuthModule }): AuthModule => AuthModule),
    data: {
      animation: 'isRight',
    },
  },
  {
    path: 'articles',
    loadChildren: (): Promise<any> =>
      import('@article/article.module').then(({ ArticleModule }): ArticleModule => ArticleModule),
    data: {
      animation: 'isRight',
    },
  },
  {
    path: 'settings',
    loadChildren: (): Promise<any> =>
      import('@settings/settings.module').then(({ SettingsModule }): SettingsModule => SettingsModule),
    data: {
      animation: 'isRight',
    },
  },
  {
    path: 'profiles',
    loadChildren: (): Promise<any> =>
      import('@user-profile/user-profile.module').then(({ UserProfileModule }): UserProfileModule => UserProfileModule),
    data: {
      animation: 'isLeft',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
