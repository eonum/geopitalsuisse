import { Component, Input, OnInit } from '@angular/core';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';

/**
 * Class is responsible that the data for the attribute-options in the dropdown is correctly loaded.
 * When an attribute is selected, a function in mapInitializer.js is called for further logic.
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() input;
  @Input() category;
  @Input() name;
  @Input() element;

  attributes: any;
  selectedAttribute: any;

  constructor(
    private characteristicsService: CharacteristicsService,
    private d3: D3Service
  ) {  }

  /**
   * Is called on init and loads the attribute-array from the backend.
   * The attributes are stored in two arrays, one that contains all the
   * numerical and the other that contains all categorical attributes
   * The attributes are then displayed in the html.
   */
  ngOnInit() {
    if (this.category === 'categoricalAttributes') {
      this.characteristicsService.getCategoricalAttributes()
        .subscribe(attributes => {
          this.attributes = attributes;

          // extract the categorical attribute 'Typ' since its not used in this selection
          this.attributes = this.attributes.filter(attribute => attribute.code !== 'Typ');
        });
      this.selectedAttribute = D3Service.getDefaultCategoricalAttribute();
    } else if (this.category === 'numericalAttributes') {
      this.characteristicsService.getNumericalAttributes()
        .subscribe(attributes => {
          this.attributes = attributes;
        });
      this.selectedAttribute = D3Service.getDefaultNumericalAttribute();
    }
  }

  filterDropdownOptions() {
    const input = (<HTMLInputElement>document.getElementById('searchField'));
    const filter = input.value.toUpperCase();
    const div = document.getElementById('attributeDropdown');
    const a = div.getElementsByTagName('a');

    for (let i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = '';
      } else {
        a[i].style.display = 'none';
      }
    }
  }

  selectAttribute(attribute) {
    this.selectedAttribute = attribute;
    this.d3.updateAttribute(attribute, this.element, this.category);
  }
}
