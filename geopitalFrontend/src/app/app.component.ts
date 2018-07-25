import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { D3Service } from './services/d3.service';

import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { Settings } from './settings';

declare const $: any;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  faGlobe = faGlobe;
  faChartLine = faChartLine;

  linkToBlog = 'http://eonum.ch/de/allgemein/geopitalsuisse/';
  linkToData = 'https://www.bag.admin.ch/bag/de/home/service/zahlen-fakten/' +
    'zahlen-fakten-zu-spitaelern/kennzahlen-der-schweizer-spitaeler.html';

  component = AppComponent;

  public languages = Settings.LANGUAGES;
  private locale;

  constructor(
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    translate.addLangs(this.languages);
    translate.setDefaultLang('de');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/de|it|fr/) ? browserLang : 'de');
  }

  static openSidebar() {
    document.getElementById('externalContent').classList.add('show');
  }

  static closeSidebar() {
    document.getElementById('externalContent').classList.remove('show');
  }

  static showMap() {
    return D3Service.showMap();
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.locale != null) {
          this.locale = params.locale;
          this.translate.use(this.locale.match(/de|fr/) ? this.locale : 'de');
        }

      });

    $(document).ready(() => {
      const userAgent = navigator.userAgent;
      const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent));
      if (isMobile || !D3Service.showMap()) {
        AppComponent.closeSidebar();
      } else if (!isMobile && D3Service.showMap()) {
        AppComponent.openSidebar();
      }
    });
  }

  selectLanguage(language: string) {
    this.translate.use(language);
    this.router.navigate([], {relativeTo: this.activatedRoute, queryParams: {locale: language} });
  }
}
