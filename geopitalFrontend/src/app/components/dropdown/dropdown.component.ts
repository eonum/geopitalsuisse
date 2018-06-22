import { Component, OnInit } from '@angular/core';
import { CharacteristicsService } from "../../services/characteristics.service";

// The declare function call is to get the D3 logic from the mapinizializer.js file
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

  public categoricalAttributes: any[] = [];
  public numericalAttributes: any[] = [];

  selectedCatAttribute: string;
  selectedNumAttribute: string;

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
        });
        this.selectedCatAttribute = this.categoricalAttributes[0].nameDE;
      });

    this.characteristicsService.getNumericalAttributes()
      .subscribe(attributes => {
        this.numericalAttributes = attributes;
        this.selectedNumAttribute = this.numericalAttributes[0].nameDE;
      });
  }

  /**
   * Function is called when user selects an attribute in the dropdown1 from the html.
   * @param categorcialAttribute selected categorical attribute from dropdown1
   */
  selectCatAttribute(categorcialAttribute) {
    showCatOptions(categorcialAttribute);
    this.handleDropdownHighlight(categorcialAttribute.nameDE, "catAttr");
    this.selectedCatAttribute = categorcialAttribute.nameDE;
  }

  /**
   * Function is called when user selects an attribute in the dropdown2 from the html.
   * @param numericalAttribute selected numerical attribute from dropdown2
   */
  selectNumAttribute(numericalAttribute){
    updateCircleRadius(numericalAttribute);
    this.handleDropdownHighlight(numericalAttribute.nameDE, "numAttr");
    this.selectedNumAttribute = numericalAttribute.nameDE;
  }

  filterNumAttr() {
    const input = (<HTMLInputElement>document.getElementById("searchNumAttr"));
    const filter = input.value.toUpperCase();
    const div = document.getElementById("numAttr");
    const a = div.getElementsByTagName("a");

    for (let i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1){
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  handleDropdownHighlight(attribute: any, id: string): void {
    const div = document.getElementById(id);
    const a = div.getElementsByTagName("a");

    for (let  i = 0; i < a.length; i++) {
      if (a[i].classList.contains("active")) {
        a[i].classList.remove("active");
      }
    }
    document.getElementById(attribute).classList.add("active");
  }
}
