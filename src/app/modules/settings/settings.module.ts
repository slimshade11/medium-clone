import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsFormComponent } from '@settings/components/settings-form/settings-form.component';
import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SettingsViewComponent } from '@settings/settings-view/settings-view.component';
import { SharedModule } from '@shared/shared.module';
import { BackendErrorMessagesComponent } from '@standalone/components/backend-error-messages/backend-error-messages.component';

const COMPONENTS: Array<any> = [SettingsFormComponent, SettingsViewComponent];
const MODULES: Array<any> = [CommonModule, SettingsRoutingModule, ReactiveFormsModule, SharedModule];
const STANDALONE: Array<any> = [BackendErrorMessagesComponent];
@NgModule({
  declarations: COMPONENTS,
  imports: [...MODULES, ...STANDALONE],
})
export class SettingsModule {}
