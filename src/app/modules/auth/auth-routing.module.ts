import { AuthViewComponent } from '@auth/components/auth-view/auth-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '@auth/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthViewComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
