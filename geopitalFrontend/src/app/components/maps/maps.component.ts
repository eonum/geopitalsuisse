import {AfterViewChecked, Component, OnInit} from '@angular/core';
import { HospitalService } from '../../services/hospital.service';
import { CharacteristicsService } from "../../services/characteristics.service";
import {Hospital} from "../../models/hospital.model";

// The declare function call is to get the D3 logic from the mapinizializer.js file
declare function mapDrawer(hospitals, numAttributes, catAttributes): any;
declare function setNumAttribute(numAttribute): any;
declare function allowDrop(ev): any;
declare function drag(ev): any;
declare function drop(ev): any;


/**
 * Loads data from backend with hospitalService and calls function for the further use of data.
 */

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit, AfterViewChecked {

  private hospitalsList: Hospital[];
  private numericalAttributes: any;
  private categoricalAttributes: any;

  constructor(
    private hospitalService: HospitalService,
    private characteristicsService: CharacteristicsService) {

  }

  /**
   * Loads all hospital data from backend with the help of hospitalService
   * and gives it to the mapDrawer() function in mapInitializer.js
   */
  ngOnInit() {
    this.characteristicsService.getNumericalAttributes()
    .subscribe(x => {
      this.numericalAttributes = x;
      // for (let i of this.numericalAttributes) {
      //   if(this.numericalAttributes.code!=null){
      //     if(this.numericalAttributes[i].code=="EtMedL"){
      //       console.log(this.numericalAttributes[i] + "----------------------");
      //       setNumAttribute(this.numericalAttributes[i]);
      //     }
      //   }
      // }
      this.characteristicsService.getCategoricalAttributes()
      .subscribe(y => {
        this.categoricalAttributes = y;

        this.hospitalService.getAll()
        .subscribe(hospitals => {
          this.hospitalsList = hospitals;
          mapDrawer(this.hospitalsList, this.numericalAttributes, this.categoricalAttributes);
        });

      })
    });





  }

  // everything in here is getting triggered every time the map is touched (click/hover)
  ngAfterViewChecked() {

  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendParent(document.getElementById(data));
    ev.preventDefault();

  }


}
