import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginRoutingModule } from './login-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    LoginRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class LoginModule { }