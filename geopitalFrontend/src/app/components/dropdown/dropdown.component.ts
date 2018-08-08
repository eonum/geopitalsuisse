import { Component, Input, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';
import { Attribute } from '../../models/attribute.model';

/**
 * Class is responsible that the data for the attribute-options in the dropdown is correctly loaded.
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() input: boolean;
  @Input() selectedAttribute: Attribute;
  @Input() attributes: Array<Attribute>;
  @Input() name: string;
  @Input() axis?: string;

  locale: string;

  constructor(
    private d3: D3Service,
    private translate: TranslateService
  ) {  }

  /**
   * Is called on init and loads the attribute-array from the backend.
   * The attributes are stored in two arrays, one that contains all the
   * numerical and the other that contains all categorical attributes
   * The attributes are then displayed in the html.
   */
  ngOnInit() {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.locale = event.lang;
    });
  }

  filterDropdownOptions() {
    const input = (<HTMLInputElement>document.getElementById('searchField-' + this.name));
    const filter = input.value.toUpperCase();
    const div = document.getElementById('attributeDropdown-' + this.name);
    const a = div.getElementsByTagName('a');

    for (let i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = '';
      } else {
        a[i].style.display = 'none';
      }
    }
  }

  selectAttribute(attribute: Attribute) {
    this.selectedAttribute = attribute;

    if (D3Service.showMap()) {
      if (CharacteristicsService.isCategoricalAttribute(attribute)) {
        this.d3.setCategoricalAttribute(attribute);
      }

      if (CharacteristicsService.isNumericalAttribute(attribute)) {
        this.d3.setNumericalAttribute(attribute);
      }

      this.d3.updateAttribute(attribute, null);

    } else {
      if (this.axis === 'x') {
        this.d3.setXCoordinateAttribute(attribute);
      } else if (this.axis === 'y') {
        this.d3.setYCoordinateAttribute(attribute);
      }
      this.d3.updateAttribute(attribute, this.axis);

    }
  }
}
