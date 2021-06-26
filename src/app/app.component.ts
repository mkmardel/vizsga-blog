import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Blogtoday';

  ngOnInit(): void {
    this.initPrivacyBar();
  }

  initPrivacyBar() {
    setTimeout(() => {
      if (!localStorage.bannerClosed) {
        $('.privacy-banner').css('display', 'inherit');
      } else {
        $('.privacy-banner').css('display', 'none');
      }
      $('.privacy-banner button').click(function () {
        $('.privacy-banner').css('display', 'none');
        localStorage.bannerClosed = 'true';
      });
      $('.banner-accept').click(function () {
        $('.privacy-banner').css('display', 'none');
        localStorage.bannerClosed = 'true';
      });
      if (navigator.userAgent.match(/Opera|OPR\//)) {
        $('.privacy-banner').css('display', 'inherit');
      }
    }, 2000);
  }
}
