import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthViewComponent } from '@auth/components/auth-view/auth-view.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthPanelComponent } from './components/auth-panel/auth-panel.component';
import { AuthPanelHeaderComponent } from './components/auth-panel/components/auth-panel-header/auth-panel-header.component';
import { AuthPanelContentComponent } from './components/auth-panel/components/auth-panel-content/auth-panel-content.component';

@NgModule({
  declarations: [AuthViewComponent, RegisterComponent, AuthPanelComponent, AuthPanelHeaderComponent, AuthPanelContentComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule],
})
export class AuthModule {}
