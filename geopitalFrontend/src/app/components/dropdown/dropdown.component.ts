import { Component, OnInit } from '@angular/core';
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

  public categoricalAttributes: any[] = [];
  public numericalAttributes: any[] = [];

  selectedCatAttribute: string;
  selectedNumAttribute: string;

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
    this.characteristicsService.getCategoricalAttributes()
      .subscribe(attributes => {
        this.categoricalAttributes = attributes;

        // extract the categorical attribute 'Typ' since its not used in this selection
        this.categoricalAttributes = this.categoricalAttributes.filter(attribute => {
          return attribute.code !== 'Typ';
        });
      });

    this.characteristicsService.getNumericalAttributes()
      .subscribe(attributes => {
        this.numericalAttributes = attributes;
      });

    this.selectedCatAttribute = D3Service.getDefaultCategoricalAttribute().nameDE;
    this.selectedNumAttribute = D3Service.getDefaultNumericalAttribute().nameDE;
  }

  /**
   * Function is called when user selects an attribute in the dropdown1 from the html.
   * @param catAttribute selected categorical attribute from dropdown1
   */
  selectCatAttribute(catAttribute: any) {
    this.d3.updateSelectedCategoricalAttribute(catAttribute);
    this.selectedCatAttribute = catAttribute.nameDE;
  }

  /**
   * Function is called when user selects an attribute in the dropdown2 from the html.
   * @param numAttribute selected numerical attribute from dropdown2
   */
  selectNumAttribute(numAttribute: any) {
    this.d3.updateSelectedNumericalAttribute(numAttribute);
    this.selectedNumAttribute = numAttribute.nameDE;
  }

  filterNumAttr() {
    const input = (<HTMLInputElement>document.getElementById('searchNumAttr'));
    const filter = input.value.toUpperCase();
    const div = document.getElementById('numAttr');
    const a = div.getElementsByTagName('a');

    for (let i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = '';
      } else {
        a[i].style.display = 'none';
      }
    }
  }
}
