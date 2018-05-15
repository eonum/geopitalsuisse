import {Component, OnInit } from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {Hospital} from "../../models/hospital.model";
import {Attributes} from "../../models/attributes.model";
declare function updateCircleRadius(selectedAttribute): any;

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
  private attributes: any[] = [];


  constructor(private hospitalService: HospitalService) {  }

  /**
   * Is called on init and loads the attribute-array from the backend.
   * The attributes are then displayed in the html.
   */
  ngOnInit() {
    this.hospitalService.getAttributes()
      .subscribe(attributes => {
        this.attributeName = attributes;

        for(let i in this.attributeName){
          var attr = this.attributeName[i];
          this.attributes.push(attr);
        }
        console.log("attributes")
        console.log(this.attributes)
      });
  }

  /**
   * Function is called when user selects an attribute in the dropdown from the html.
   * @param attribute selected attribute from dropdown
   */
  selectedAttribute(attribute){
    console.log("selected attribute" + attribute.code);
    updateCircleRadius(attribute);
  }
}
