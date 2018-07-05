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
  private userAgent;

  constructor(
    private d3: D3Service
  ) { }


  ngOnInit() {
    $(document).ready(() => {
      this.userAgent = navigator.userAgent;
      if (AppComponent.isMobile(this.userAgent) || !D3Service.showMap()) {
        this.closeSidebar();
      } else {
        this.openSidebar();
      }
    });
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
