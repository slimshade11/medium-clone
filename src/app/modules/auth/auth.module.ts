import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthViewComponent } from '@auth/auth-view/auth-view.component';
import { AuthFacade } from '@auth/auth.facade';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { LoginFormService } from '@auth/services/login-form.service';
import { RegisterFormService } from '@auth/services/register-form.service';
import { SharedModule } from '@shared/shared.module';
import { BackendErrorMessagesComponent } from '@standalone/components/backend-error-messages/backend-error-messages.component';

const COMPONENTS: Array<Type<any>> = [RegisterComponent, LoginComponent, AuthViewComponent];
const MODULES: Array<Type<any>> = [
  CommonModule,
  SharedModule,
  ReactiveFormsModule,
  HttpClientModule,
  AuthRoutingModule,
  BackendErrorMessagesComponent,
];
const SERVICES: Array<Type<any>> = [RegisterFormService, LoginFormService, AuthFacade];

@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
  providers: SERVICES,
})
export class AuthModule {}
