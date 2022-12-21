import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsFormComponent } from '@settings/components/settings-form/settings-form.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
