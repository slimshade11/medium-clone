import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from '@store/auth/auth.effects';
import { ROOT_REDUCERS } from '@store/root-reducer';

const declarations: Array<Type<any>> = [AppComponent];

const imports = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
  StoreModule.forRoot(ROOT_REDUCERS),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
  }),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  EffectsModule.forRoot([AuthEffects]),
];
const providers: Array<Type<any>> = [];

@NgModule({
  declarations,
  imports,
  providers,
  bootstrap: [AppComponent],
})
export class AppModule {}
