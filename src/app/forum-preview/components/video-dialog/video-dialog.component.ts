import { Component, OnInit } from '@angular/core';
import { CurrentLocationService } from '../../../shared/services/current-location.service';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent implements OnInit {

  constructor(private location : CurrentLocationService) { }

  ngOnInit() {
  }

  getLanguage() : string {
    return this.location.language;
  }

}
