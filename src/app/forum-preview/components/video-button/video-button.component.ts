import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';

@Component({
  selector: 'app-video-button',
  templateUrl: './video-button.component.html',
  styleUrls: ['./video-button.component.scss']
})
export class VideoButtonComponent {

  constructor(public dialog: MatDialog) { }

  openVideo(): void {
    this.dialog.open(VideoDialogComponent, {
      panelClass: 'videoWindow'
    });
  }
}
