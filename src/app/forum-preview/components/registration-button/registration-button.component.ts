import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-registration-button',
  templateUrl: './registration-button.component.html',
  styleUrls: ['./registration-button.component.scss']
})
export class RegistrationComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(RegistrationDialogComponent, {
      panelClass: 'regDialogWindow'
    });
  }
}
