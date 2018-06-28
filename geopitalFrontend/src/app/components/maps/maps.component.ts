import { Component, OnInit } from '@angular/core';

import { D3Service } from '../../services/d3.service';
import { CharacteristicsService } from '../../services/characteristics.service';
import { HospitalService } from '../../services/hospital.service';
import { Attribute } from '../../models/attribute.model';
import { Hospital } from '../../models/hospital.model';


/**
 * Loads data from backend with hospitalService and calls function for the further use of data.
 */

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

  changeToView = 'Scatterplot';
  private numericalAttributes: Attribute[];
  private categoricalAttributes: Attribute[];
  private hospitalsList: Hospital[];

  constructor (
    private characteristicsService: CharacteristicsService,
    private hospitalService: HospitalService,
    private d3: D3Service
  ) {}

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
                this.d3.drawMap(this.hospitalsList, this.numericalAttributes, this.categoricalAttributes);
              });

          });
      });
  }
}
