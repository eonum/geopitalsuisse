import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';
import { CharacteristicsService } from "../../services/characteristics.service";
import { Hospital } from "../../models/hospital.model";

// The declare function call is to get the D3 logic from the mapinizializer.js file
declare function mapDrawer(hospitals, numAttributes, catAttributes): any;

/**
 * Loads data from backend with hospitalService and calls function for the further use of data.
 */

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

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
}
