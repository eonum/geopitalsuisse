import { TestBed } from '@angular/core/testing';

import { Hospitals } from '../../mocks/data/mock-hospitals';
import { Variables } from '../../mocks/data/mock-variables';
import { StringAttributes } from '../../mocks/data/mock-string-attributes';
import { Attribute } from '../models/attribute.model';
import { VariableService } from './variable.service';

describe('VariableService', () => {
  let service: VariableService;
  let attribute: Attribute;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VariableService
      ]
    });

    service = TestBed.get(VariableService);
  });

  beforeEach(() => {
    attribute = StringAttributes.filter(attr => attr.code === 'KT')[0];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get value of variable', () => {
    const value = VariableService.getValueOfVariable(Variables[0]);
    expect(value).toEqual(Variables[0][Object.keys(Variables[0])[0]].value);
  });

  it('should return null if variable has no value', () => {
    const value = VariableService.getValueOfVariable(Variables[3]);
    expect(value).toEqual(null);
  });

  it('should return null if variable is null', () => {
    const value = VariableService.getValueOfVariable(null);
    expect(value).toEqual(null);
  });

  it('should get variable from hospital by attribute', () => {
    const variable = service.getVariableOfHospitalByAttribute(Hospitals[0], attribute);
    expect(variable).toBeDefined();
    expect(variable).toEqual(Variables.filter(v => Object.keys(v)[0] === 'KT')[0]);
  });

  it('should return null if hospital to get variable from is undefined', () => {
    const variable = service.getVariableOfHospitalByAttribute(null, attribute);
    expect(variable).toBe(null);
  });

  it('should return null if hospital to get variable from is undefined', () => {
    const variable = service.getVariableOfHospitalByAttribute(Hospitals[0], null);
    expect(variable).toBe(null);
  });

});
