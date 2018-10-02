import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Settings } from './settings';

declare const $: any;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  linkToBlog = 'http://eonum.ch/de/allgemein/geopitalsuisse/';
  linkToData = 'https://www.bag.admin.ch/bag/de/home/zahlen-und-statistiken/zahlen-fakten-zu-spitaelern/kennzahlen-der-schweizer-spitaeler.html';

  component = AppComponent;
  languages = Settings.LANGUAGES;
  view;

  constructor(
    public translate: TranslateService,
    private router: Router
  ) {
    this.translate.addLangs(this.languages);
    this.translate.setDefaultLang(Settings.DEFAULT_LANGUAGE);

    const isGerman = window.location.href.split('/').indexOf('de') > -1;
    const isFrench = window.location.href.split('/').indexOf('fr') > -1;
    this.translate.use(isGerman ? 'de' : isFrench ? 'fr' : Settings.DEFAULT_LANGUAGE);
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.view = event.urlAfterRedirects.split('/').indexOf('map') > -1 ? 'map' : 'statistics';
      }
    });

    $(document).ready(() => {
      const userAgent = navigator.userAgent;
      const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent));
      if (isMobile || this.view === 'statistics') {
        document.getElementById('externalContent').classList.remove('show');
      } else if (!isMobile && this.view === 'map') {
        document.getElementById('externalContent').classList.add('show');
      }
    });
  }
}
