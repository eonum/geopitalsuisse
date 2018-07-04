import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';
import { Settings } from '../../settings';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  languages = Settings.LANGUAGES;

  name1 = 'Filter';
  selectedCatAttribute;
  categoricalAttributes;

  name2 = 'Kennzahlen';
  selectedNumAttribute;
  numericalAttributes;

  constructor(
    private characteristicsService: CharacteristicsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.characteristicsService.getCategoricalAttributes().subscribe(attributes => {
      this.categoricalAttributes = attributes;

      // extract the categorical attribute 'Typ' since its not used in this selection
      this.categoricalAttributes = this.categoricalAttributes.filter(attribute => attribute.code !== 'Typ');
    });

    this.characteristicsService.getNumericalAttributes().subscribe(attributes => {
      this.numericalAttributes = attributes;
    });

    this.selectedCatAttribute = D3Service.getDefaultCategoricalAttribute();
    this.selectedNumAttribute = D3Service.getDefaultNumericalAttribute();
  }

  setLanguage(language: string) {
    console.log('set language: ' + language);
  }

  toggleCollapse() {
    $('#sidebarCollapse').on('hide.bs.collapse', function () {
      document.getElementById('navSidebar').classList.add('transparent');
    });

    $('#sidebarCollapse').on('show.bs.collapse', function () {
      document.getElementById('navSidebar').classList.remove('transparent');
    });
  }

}
