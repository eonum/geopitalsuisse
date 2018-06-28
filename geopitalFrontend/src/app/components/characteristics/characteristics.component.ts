import { Component, OnInit } from '@angular/core';
import { D3Service } from '../../services/d3.service';
import { HospitalService } from '../../services/hospital.service';

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
    private d3: D3Service
  ) {}

  private static formatValues(attribute: any, value: string) {
    if (attribute.nameDE.includes('Anteil')) {
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
    this.hospitalService.getAll().subscribe(hospitals => {
      this.allHospitals = hospitals;
      this.selectedHospital = this.allHospitals[0];
      this.updateCharacteristicsData();
    });

    this.d3.selectedHospital$.subscribe(hospital => {
      this.selectedHospital = this.allHospitals.find(obj => obj.name === hospital.name);
      this.updateCharacteristicsData();
    });

    this.d3.currentCategoricalAttribute$.subscribe(catAttribute => {
      this.currentCategoricalAttribute = catAttribute;
      this.updateCharacteristicsData();
    });

    this.d3.currentNumericalAttribute$.subscribe(attribute => {
      this.currentNumericalAttribute = attribute;
      this.updateCharacteristicsData();
    });

    this.currentCategoricalAttribute = D3Service.getDefaultCategoricalAttribute();
    this.currentNumericalAttribute = D3Service.getDefaultNumericalAttribute();
  }

  private updateCharacteristicsData () {
    const sizeResult = this.selectedHospital.hospital_attributes.find(obj => obj.code === this.currentNumericalAttribute.code);
    const catResult = this.selectedHospital.hospital_attributes.find(obj => obj.code === this.currentCategoricalAttribute.code);

    if (this.selectedHospital.streetAndNumber !== '') {
      this.address = this.selectedHospital.streetAndNumber + ', ' + this.selectedHospital.zipCodeAndCity;
    } else {
      this.address = this.selectedHospital.zipCodeAndCity;
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
