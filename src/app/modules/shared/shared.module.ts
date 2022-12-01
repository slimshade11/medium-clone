import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModules } from '@core/angular-material-modules/angular-material-modules';

@NgModule({
  declarations: [],
  imports: [CommonModule, ...AngularMaterialModules],
  exports: [...AngularMaterialModules],
})
export class SharedModule {}
