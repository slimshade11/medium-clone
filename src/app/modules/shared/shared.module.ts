import { AngularMaterialModules } from '@core/angular-material-modules/angular-material.modules';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, ...AngularMaterialModules],
  exports: [...AngularMaterialModules],
})
export class SharedModule {}
