import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from '@store/root-reducer';

const IMPORTS = [BrowserModule, AppRoutingModule, BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCERS)];

@NgModule({
  declarations: [AppComponent],
  imports: [...IMPORTS],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
