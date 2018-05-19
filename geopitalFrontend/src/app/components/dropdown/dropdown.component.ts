import {Component, OnInit } from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
declare function updateCircleRadius(attribute): any;
declare function updateCircleShape(attribute): any;

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


  constructor(private hospitalService: HospitalService) {  }

  /**
   * Is called on init and loads the attribute-array from the backend.
   * The attributes are stored in two arrays, one that contains all the
   * numerical and the other that contains all categorical attributes
   * The attributes are then displayed in the html.
   */
  ngOnInit() {
    this.hospitalService.getCategoricalAttributes()
      .subscribe(attributes => {
        this.categoricalAttributes = attributes;

        console.log("categorical attributes in dropdowncomp");
        console.log(this.categoricalAttributes);
      });

      this.hospitalService.getNumericalAttributes()
      .subscribe(attributes => {
        this.numericalAttributes = attributes;

        console.log("numerical attributes in dropdowncomp");
        console.log(this.numericalAttributes);
      });
  }

  /**
   * Function is called when user selects an attribute in the dropdown from the html.
   * @param attribute selected attribute from dropdown
   */
  selectedNumAttribute(numericalAttribute){
    console.log("selected attribute" + numericalAttribute.nameDE);
    updateCircleRadius(numericalAttribute);
  }

  selectedCatAttribute(categorialAttribute) {
    console.log("selectec categorial attribute:" + categorialAttribute.nameDE)
    updateCircleShape(categorialAttribute);
  }
}
