import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material.module';

import { LoginformComponent } from './loginform/loginform.component';
import { RegisterformComponent } from './registerform/registerform.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    RegisterformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
