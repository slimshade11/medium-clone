import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthPanelComponent } from '@auth/components/auth-panel/auth-panel.component';
import { AuthPanelContentComponent } from '@auth/components/auth-panel/components/auth-panel-content/auth-panel-content.component';
import { AuthPanelHeaderComponent } from '@auth/components/auth-panel/components/auth-panel-header/auth-panel-header.component';
import { AuthViewComponent } from '@auth/components/auth-view/auth-view.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AuthViewComponent,
    RegisterComponent,
    AuthPanelComponent,
    AuthPanelHeaderComponent,
    AuthPanelContentComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule],
})
export class AuthModule {}
