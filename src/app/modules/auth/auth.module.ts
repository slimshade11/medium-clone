import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthFacade } from '@auth/auth.facade';
import { AuthPanelComponent } from '@auth/components/auth-panel/auth-panel.component';
import { AuthPanelContentComponent } from '@auth/components/auth-panel/components/auth-panel-content/auth-panel-content.component';
import { AuthPanelHeaderComponent } from '@auth/components/auth-panel/components/auth-panel-header/auth-panel-header.component';
import { AuthViewComponent } from '@auth/components/auth-view/auth-view.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { AuthService } from '@auth/services/auth.service';
import { SharedModule } from '@shared/shared.module';

const DECLARATIONS: Array<Type<any>> = [
  AuthViewComponent,
  RegisterComponent,
  AuthPanelComponent,
  AuthPanelHeaderComponent,
  AuthPanelContentComponent,
];
const IMPORTS: Array<Type<any>> = [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule];
const PROVIDERS: Array<Type<any>> = [AuthFacade, AuthService];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...IMPORTS],
  providers: [...PROVIDERS],
})
export class AuthModule {}
