import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../shared/modules/angular-material.module';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/modules/shared.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [

  ]
})
export class LoginModule { }
