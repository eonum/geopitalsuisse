import { Component, OnInit } from '@angular/core';
import { D3Service } from './services/d3.service';

import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';

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

  constructor() {}

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
    $(document).ready(() => {
      const userAgent = navigator.userAgent;
      const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent));
      if (isMobile || !D3Service.showMap()) {
        AppComponent.closeSidebar();
      } else if (!isMobile && !D3Service.showMap()) {
        AppComponent.openSidebar();
      }
    });
  }
}
