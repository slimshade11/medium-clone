import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '@user-profile/components/user-profile/user-profile.component';
import { UserProfileViewComponent } from '@user-profile/user-profile-view/user-profile-view.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileViewComponent,
    children: [
      {
        path: ':slug',
        component: UserProfileComponent,
      },
      {
        path: ':slug/favourites',
        component: UserProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
