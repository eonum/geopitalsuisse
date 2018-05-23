import {AfterViewChecked, Component, OnInit} from '@angular/core';
declare function mapDrawer(hospitals, numAttributes, catAttributes): any;
import { HospitalService } from '../../services/hospital.service';
import { CharacteristicsService } from "../../services/characteristics.service";
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

    // should set num attribute to default value "EtMedL" TODO: make it work
    // this.characteristicsService.getNumericalAttributes()
    //   .subscribe(attributes => {
    //     this.numericalAttributes = attributes;
    //     for (let i of this.numericalAttributes) {
    //       if(this.numericalAttributes.code!=null){
    //         if(this.numericalAttributes[i].code=="EtMedL"){
    //           console.log(this.numericalAttributes[i] + "----------------------");
    //           setNumAttribute(this.numericalAttributes[i]);
    //         }
    //       }
    //     }
    //   });

    // this.characteristicsService.getCategoricalAttributes()
    //   .subscribe(attributes => {
    //     this.categoricalAttributes = attributes;
    //   })

    // this.hospitalService.getAll()
    //   .subscribe(hospitals => {
    //     this.hospitalsList = hospitals;
    //     mapDrawer(this.hospitalsList, this.numericalAttributes, this.categoricalAttributes);
    //   });
    this.characteristicsService.getNumericalAttributes()
    .subscribe(x => {
      this.numericalAttributes = x;
      for (let i of this.numericalAttributes) {
        if(this.numericalAttributes.code!=null){
          if(this.numericalAttributes[i].code=="EtMedL"){
            console.log(this.numericalAttributes[i] + "----------------------");
            setNumAttribute(this.numericalAttributes[i]);
          }
        }
      }
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

}
