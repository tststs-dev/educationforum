// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//shared modules
import { SharedModule } from '../shared/modules/shared.module';
import { AngularMaterialModule } from '../shared/modules/angular-material.module';

//components
import { ForumPreviewComponent } from './forum-preview.component';
import { RegistrationComponent } from './components/registration-button/registration-button.component';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { VideoButtonComponent } from './components/video-button/video-button.component';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { RegistrationSuccessDiaglogComponent } from './components/registration-success-diaglog/registration-success-diaglog.component';


//services
import { RegistrationService } from '../shared/services/registration.service';
import { CurrentLocationService } from '../shared/services/current-location.service';



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
    ForumPreviewComponent,
    RegistrationComponent,
    RegistrationDialogComponent,
    VideoButtonComponent,
    VideoDialogComponent,
    CountdownComponent,
    RegistrationSuccessDiaglogComponent
  ],
  exports: [
    ForumPreviewComponent
  ],
  entryComponents: [
    RegistrationDialogComponent,
    VideoDialogComponent,
    RegistrationSuccessDiaglogComponent
  ],
  providers: [
    RegistrationService,
    CurrentLocationService
  ]
})
export class ForumPreviewModule { }
