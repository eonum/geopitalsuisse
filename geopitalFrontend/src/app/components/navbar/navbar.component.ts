import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { Attribute } from '../../models/attribute.model';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';

/**
 * Handles checkbox-events implemented in the html-file of this component.
 * User can select or deselect a checkbox that contain the types of hospitals.
 * Hospitals of a certain type must only be displayed when the according checkbox is selected.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  hospitalMainTypes: Attribute;
  locale: string;

  constructor(
    private d3: D3Service,
    private characteristicsService: CharacteristicsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.characteristicsService.getAttributeByName('geopital_main_type').subscribe((attribute: Attribute) => {
      this.hospitalMainTypes = attribute;
    });

    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.locale = event.lang;
    });
  }

  selectHospitalType() {
    const input = (<HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName('checkbox'));
    const selectedHospitalTypes = [];

    for (let i = 0; i < input.length; i++) {
      if (input[i].checked) {
        selectedHospitalTypes.push(input[i].value);
      }
    }

    this.d3.updateSelectedHospitalTypes(selectedHospitalTypes);
  }
}
