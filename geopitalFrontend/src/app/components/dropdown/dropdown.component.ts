import {Component, OnInit } from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {Hospital} from "../../models/hospital.model";
import {Attributes} from "../../models/attributes.model";
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

  private hospitalsList: Hospital[];
  private attributeName : Attributes[];
  private categorialAttributes: any[] = [];
  private numericalAttributes: any[] = [];


  constructor(private hospitalService: HospitalService) {  }

  /**
   * Is called on init and loads the attribute-array from the backend.
   * The attributes are then displayed in the html.
   */
  ngOnInit() {
    this.hospitalService.getCategorialAttributes()
      .subscribe(attributes => {
        this.attributeName = attributes;

        for(let i in this.attributeName){
          var attr = this.attributeName[i];
          this.categorialAttributes.push(attr);
        }
        console.log("attributes in dropdowncomp")
        console.log(attributes)
      });

      this.hospitalService.getNumericalAttributes()
      .subscribe(attributes => {
        this.attributeName = attributes;

        for(let i in this.attributeName){
          var attr = this.attributeName[i];
          this.numericalAttributes.push(attr);
        }
        console.log("numerical attributes in dropdowncomp")
        console.log(this.numericalAttributes)
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
