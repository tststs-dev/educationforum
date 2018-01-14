import { Component, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CurrentLocationService } from '../shared/services/current-location.service';


@Component({
  selector: 'app-forum-preview',
  templateUrl: './forum-preview.component.html',
  styleUrls: ['./forum-preview.component.scss']
})
export class ForumPreviewComponent implements OnInit {

  loaded: boolean = false;

  constructor(private translate: TranslateService,
              private location : CurrentLocationService)
  {}

  ngOnInit() {
    this.location
      .getCurrentCountry()
      .subscribe( res => {
          this.location.language = (res == 'UA' ? 'ua' : 'en');
          this.translate.use(this.location.language);
          this.loaded = true;
        },
        err => {
          this.location.language = 'ua';
          this.translate.use(this.location.language);
          this.loaded = true;
        });
  }

  switchLanguage(language: string) {
    this.location.language = language;
    this.translate.use(this.location.language);
  }

}
