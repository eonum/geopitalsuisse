import { Component, OnInit } from '@angular/core';

import { D3Service } from '../../services/d3.service';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from "../../models/hospital.model";
import { CharacteristicsService } from "../../services/characteristics.service";
import { Attribute } from "../../models/attribute.model";

/**
 * Component for the short information (Steckbrief) of the selected hospital.
 */

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit {

  allHospitals;
  selectedHospital;

  address;

  currentCategoricalAttribute;
  currentCategoricalAttributeValue;

  currentNumericalAttribute;
  currentNumericalAttributeValue;

  constructor (
    private hospitalService: HospitalService,
    private characteristicsService: CharacteristicsService,
    private d3: D3Service
  ) {}

  private static formatValues(attribute: Attribute, value: string) {
    console.log('attribute', attribute)
    if (attribute.name_de.includes('Anteil')) {
      if (parseFloat(value) > 1) {
        return (parseFloat(value) / 100).toLocaleString('de-CH', { style: 'percent', minimumFractionDigits: 3});
      } else {
        return parseFloat(value).toLocaleString('de-CH', { style: 'percent', minimumFractionDigits: 3});
      }
    } else {
      return parseFloat(value).toLocaleString('de-CH', { maximumFractionDigits: 3});
    }
  }

  ngOnInit() {
    this.hospitalService.getHospitals().subscribe((hospitals: Array<Hospital>) => {
      this.allHospitals = hospitals;
      this.selectedHospital = this.allHospitals[0];
      this.updateCharacteristicsData();
    });

    this.d3.selectedHospital$.subscribe(hospital => {
      this.selectedHospital = this.allHospitals.filter(obj => obj.name === hospital.name)[0];
      this.updateCharacteristicsData();
    });

    this.d3.currentCategoricalAttribute$.subscribe((attribute: Attribute) => {
      this.currentCategoricalAttribute = attribute;
      this.updateCharacteristicsData();
    });

    this.d3.currentNumericalAttribute$.subscribe((attribute: Attribute) => {
      this.currentNumericalAttribute = attribute;
      this.updateCharacteristicsData();
    });

  }

  private updateCharacteristicsData () {
    let sizeResult = null;
    let catResult = null;

    if (this.currentCategoricalAttribute != null && this.currentNumericalAttribute != null) {
      sizeResult = this.selectedHospital.attributes.filter(obj => Object.keys(obj)[0] === this.currentNumericalAttribute.code)[0];
      catResult = this.selectedHospital.attributes.filter(obj => Object.keys(obj)[0] === this.currentCategoricalAttribute.code)[0];

    }

    if (sizeResult != null) {
      this.currentNumericalAttributeValue = CharacteristicsComponent.formatValues(this.currentCategoricalAttribute, sizeResult.value);
    } else {
      this.currentNumericalAttributeValue = 'Keine Daten';
    }

    if (catResult != null) {
      this.currentCategoricalAttributeValue = catResult.value;
    } else {
      this.currentCategoricalAttributeValue = 'Keine Daten';
    }
  }
}
