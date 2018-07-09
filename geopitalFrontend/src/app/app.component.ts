import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { D3Service } from './services/d3.service';

import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';

declare const $: any;

import { Settings } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {

  faGlobe = faGlobe;
  faChartLine = faChartLine;

  linkToBlog = 'http://eonum.ch/de/allgemein/geopitalsuisse/';
  linkToData = 'https://www.bag.admin.ch/bag/de/home/service/zahlen-fakten/zahlen-fakten-zu-spitaelern/kennzahlen-der-schweizer-spitaeler.html';

  public languages = Settings.LANGUAGES;
  private userAgent;

  private locale;

  constructor(
    private d3: D3Service,
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    translate.addLangs(this.languages);
    translate.setDefaultLang('de');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/de|it|fr/) ? browserLang : 'de');
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.locale != undefined) {
          this.locale = params.locale;
          this.translate.use(this.locale.match(/de|it|fr/) ? this.locale : 'de');
        }

      });

    $(document).ready(() => {
      this.userAgent = navigator.userAgent;
      if (AppComponent.isMobile(this.userAgent) || !D3Service.showMap()) {
        this.closeSidebar();
      } else {
        this.openSidebar();
      }
    });
  }

  selectLanguage(language: string) {
    this.translate.use(language);
    this.router.navigate([], {relativeTo: this.activatedRoute, queryParams: {locale: language} });
  }

  showMap() {
    return D3Service.showMap();
  }

  openSidebar() {
    if (!AppComponent.isMobile(this.userAgent)) {
      document.getElementById('externalContent').classList.add('show');
    }
  }

  closeSidebar() {
    document.getElementById('externalContent').classList.remove('show');
  }

  private static isMobile(userAgent): boolean {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent));
  }
}
