import {Component, OnInit } from '@angular/core';
import { CharacteristicsService } from "../../services/characteristics.service";
import {Attributes} from "../../models/attributes.model";

declare function updateCircleRadius(attribute): any;
declare function showCatOptions(attribute): any;

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

  private categoricalAttributes: any[] = [];
  private numericalAttributes: any[] = [];


  constructor(private characteristicsService: CharacteristicsService) {  }

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

        // extract the categorical attribute "Typ" since its not used in this selection
        this.categoricalAttributes = this.categoricalAttributes.filter(attribute => {
        return attribute.code !== "Typ";
        })
      });

    this.characteristicsService.getNumericalAttributes()
      .subscribe(attributes => {
        this.numericalAttributes = attributes;
      });
  }

  /**
   * Function is called when user selects an attribute in the dropdown1 from the html.
   * @param categorcialAttribute selected categorical attribute from dropdown1
   */
  selectedCatAttribute(categorcialAttribute) {
    showCatOptions(categorcialAttribute);
  }

  /**
   * Function is called when user selects an attribute in the dropdown2 from the html.
   * @param numericalAttribute selected numerical attribute from dropdown2
   */
  selectedNumAttribute(numericalAttribute){
    updateCircleRadius(numericalAttribute);
  }


}
