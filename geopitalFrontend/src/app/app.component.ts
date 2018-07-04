import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { Settings } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit{

  private languages = Settings.LANGUAGES;

  constructor(
    private http: HttpClient,
    translate: TranslateService
  ) {
    translate.addLangs(this.languages);
  }


  /**
   * Gives a "connection refused" error
   * Infos from: https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
   */
  ngOnInit() {
  }
}
