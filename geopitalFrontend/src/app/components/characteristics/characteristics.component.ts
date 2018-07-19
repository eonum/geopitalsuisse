import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Attribute } from '../../models/attribute.model';
import { Hospital } from '../../models/hospital.model';
import { VariableService } from '../../services/variable.service';

/**
 * Component for the short information (Steckbrief) of the selected hospital.
 */
@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit, OnChanges {

  @Input() hospital: Hospital;
  @Input() categoricalAttribute: Attribute;
  @Input() numericalAttribute: Attribute;

  categoricalAttributeValue: string;
  numericalAttributeValue: string;

  constructor (
    private variableService: VariableService,
  ) {}


  ngOnInit() {
    this.updateCharacteristicsData(this.hospital, this.categoricalAttribute, this.numericalAttribute);
  }

  ngOnChanges() {
    this.updateCharacteristicsData(this.hospital, this.categoricalAttribute, this.numericalAttribute);
  }


  private updateCharacteristicsData (hospital: Hospital, categoricalAttribute: Attribute, numericalAttribute: Attribute) {
    const numericalVariable = this.variableService.getVariableOfHospitalByAttribute(hospital, numericalAttribute);
    const categoricalVariable = this.variableService.getVariableOfHospitalByAttribute(hospital, categoricalAttribute);

    if (numericalVariable != null) {
      this.numericalAttributeValue = CharacteristicsComponent.formatValues(numericalAttribute, VariableService.getValueOfVariable(numericalVariable));
    } else {
      this.numericalAttributeValue = 'Keine Daten';
    }

    if (categoricalVariable != null) {
      this.categoricalAttributeValue = VariableService.getValueOfVariable(categoricalVariable);
    } else {
      this.categoricalAttributeValue = 'Keine Daten';
    }
  }

  private static formatValues(attribute: Attribute, value: string) {
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
}
