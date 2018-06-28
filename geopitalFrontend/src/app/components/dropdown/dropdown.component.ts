import { Component, Input, OnInit } from '@angular/core';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';

/**
 * Class is responsible that the data for the attribute-options in the dropdown is correctly loaded.
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() input;
  @Input() selectedAttribute;
  @Input() attributes;
  @Input() name;
  @Input() axis?;


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
  ngOnInit() {}

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
    console.log('is numerical attribute', )

    if (D3Service.showMap()) {
      if (this.characteristicsService.isCategoricalAttribute(attribute)) {
        this.d3.setCurrentCategoricalAttribute(attribute);
      }

      if (this.characteristicsService.isNumericalAttribute(attribute)) {
        this.d3.setCurrentNumericalAttribute(attribute);
      }

      this.d3.updateAttribute(attribute,null);

    } else {
      this.d3.updateAttribute(attribute, this.axis);

    }
  }
}
