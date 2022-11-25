import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthViewComponent } from './components/auth-view/auth-view.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AuthViewComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
