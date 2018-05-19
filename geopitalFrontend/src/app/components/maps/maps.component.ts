import {AfterViewChecked, Component, OnInit} from '@angular/core';
declare function mapDrawer(data): any;
import { HospitalService } from '../../services/hospital.service';
import {Hospital} from "../../models/hospital.model";
declare function setNumAttribute(numAttribute): any;


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

  constructor(private hospitalService: HospitalService) {

  }

  /**
   * Loads all hospital data from backend with the help of hospitalService
   * and gives it to the mapDrawer() function in mapInitializer.js
   */
  ngOnInit() {

    // should set num attribute to default value "EtMedL" TODO: make it work
    this.hospitalService.getNumericalAttributes()
      .subscribe(attributes => {
        this.numericalAttributes = attributes;
        for (let i of this.numericalAttributes) {
          if(this.numericalAttributes.code!=null){
            if(this.numericalAttributes[i].code=="EtMedL"){
              console.log(this.numericalAttributes[i] + "----------------------");
              setNumAttribute(this.numericalAttributes[i]);
            }
          }
        }
      });

    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        mapDrawer(this.hospitalsList);
      });
  }

  // everything in here is getting triggered every time the map is touched (click/hover)
  ngAfterViewChecked() {

  }

}
