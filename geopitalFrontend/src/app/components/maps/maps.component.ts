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

  constructor (
    private characteristicsService: CharacteristicsService,
    private hospitalService: HospitalService,
    private d3: D3Service
  ) {}

  ngOnInit() {
    this.characteristicsService.getAttributes().subscribe((attributes: Array<Attribute>) => {
      const numericalAttributes = attributes.filter(attribute => attribute.variable_type === 'number');
      const categoricalAttributes = attributes.filter(attribute => attribute.variable_type === 'string' && attribute.variable_sets.indexOf('geopital_test') > -1);

      this.hospitalService.getHospitals()
        .subscribe((hospitals: Array<Hospital>) => {
          this.d3.drawMap(hospitals, numericalAttributes, categoricalAttributes);
        });
    })
  }
}
