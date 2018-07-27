import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';

import { Settings } from '../../settings';

declare const $: any;

@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.css']
})
export class MenuPopoverComponent implements OnInit {
  faGlobe = faGlobe;
  faChartLine = faChartLine;
  faEllipsisV = faEllipsisV;
  languages = Settings.LANGUAGES;
  currentRoute = '';

  constructor(
    public translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.split('/').indexOf('map') > -1 ? 'map' : 'statistics';
      }
    });

    $(function() {
      $('[data-toggle=popover]').popover({
        html : true,
        content: function() {
          const content = $(this).attr('data-popover-content');
          return $(content).children('.popover-body').html();
        }
      });
    });
  }
}
