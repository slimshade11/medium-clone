import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { SettingsViewComponent } from '@settings/components/settings-view/settings-view.component';
import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SharedModule } from '@shared/shared.module';

const COMPONENTS: Array<Type<unknown>> = [SettingsViewComponent];
const MODULES: Array<Type<unknown>> = [CommonModule, SettingsRoutingModule, SharedModule];

@NgModule({
  declarations: COMPONENTS,
  imports: [...MODULES],
})
export class SettingsModule {}
