import { Component, OnInit } from '@angular/core';

//jquery var
declare let $ : any;

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let currentDate = new Date();
    let futureDate = new Date("March 28, 2018 0:00");
    let diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

    $('.countdown').FlipClock(diff, {
      clockFace: 'DailyCounter',
      countdown: true,
      showSeconds: false,
      language: 'ru',
      callbacks: {
        start: function () {
          if (diff < (3600 * 24 * 100)) {
            let leading_zero = $('ul.flip').first().clone();
            leading_zero.find('li.flip-clock-active').removeClass('flip-clock-active');
            leading_zero.find('li.flip-clock-before').removeClass('flip-clock-before');
            leading_zero.find('.inn').html('0');

            $('span.days').after(leading_zero);
          }
        }
      }
    });

  }

}
