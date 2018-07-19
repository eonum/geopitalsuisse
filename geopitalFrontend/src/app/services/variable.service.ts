import { Injectable } from '@angular/core';

import { Variable } from "../models/variable.model";
import { Hospital } from "../models/hospital.model";
import { Attribute } from "../models/attribute.model";

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  constructor() { }

  static getValueOfVariable(variable: Variable): string {
    const value = variable[Object.keys(variable)[0]].value;
    return (value != null) ? value : null;
  }

  getVariableOfHospitalByAttribute(hospital: Hospital, attribute: Attribute) {
    const variable: Variable = hospital.attributes.filter(obj => Object.keys(obj)[0] === attribute.code)[0];
    return (variable != null) ? variable : null;
  }
}
