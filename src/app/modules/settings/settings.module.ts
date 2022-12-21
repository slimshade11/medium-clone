import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsFormComponent } from '@settings/components/settings-form/settings-form.component';
import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SharedModule } from '@shared/shared.module';
import { BackendErrorMessagesComponent } from '@standalone/components/backend-error-messages/backend-error-messages.component';

const COMPONENTS: Array<Type<unknown>> = [SettingsFormComponent];
const MODULES: Array<Type<unknown>> = [CommonModule, SettingsRoutingModule, ReactiveFormsModule, SharedModule];
const STANDALONE: Array<Type<unknown>> = [BackendErrorMessagesComponent];
@NgModule({
  declarations: COMPONENTS,
  imports: [...MODULES, ...STANDALONE],
})
export class SettingsModule {}
