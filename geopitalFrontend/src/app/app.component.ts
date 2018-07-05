import { Component, OnInit } from '@angular/core';
import { D3Service } from './services/d3.service';

declare const $: any;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {

  changeToView = 'Scatterplot';

  constructor(
    private d3: D3Service
  ) { }


  ngOnInit() {
    $(document).ready(() => {
      if (this.isMobile(navigator.userAgent) || !D3Service.showMap()) {
        document.getElementById('externalContent').classList.remove('show');
      } else {
        document.getElementById('externalContent').classList.add('show');
      }
    });
  }

  showMap() {
    return D3Service.showMap();
  }

  openSidebar() {
    if (!this.isMobile()) {
      document.getElementById('externalContent').classList.add('show');
    }
  }

  closeSidebar() {
    document.getElementById('externalContent').classList.remove('show');
  }

  private isMobile(userAgent): boolean {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent));
  }
}
