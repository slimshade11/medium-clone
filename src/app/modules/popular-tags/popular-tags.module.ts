import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopularTagsComponent } from '@popular-tags/components/popular-tags/popular-tags.component';
import { SharedModule } from '@shared/shared.module';
import { BackendErrorMessagesComponent } from '@standalone/components/backend-error-messages/backend-error-messages.component';

export const IMPORTS: Array<Type<unknown>> = [CommonModule, SharedModule, BackendErrorMessagesComponent, RouterModule];

@NgModule({
  declarations: [PopularTagsComponent],
  imports: [...IMPORTS],
  exports: [PopularTagsComponent],
})
export class PopularTagsModule {}
