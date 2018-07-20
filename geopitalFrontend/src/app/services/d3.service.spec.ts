import { TestBed, inject } from '@angular/core/testing';

import { D3Service } from './d3.service';
import { CharacteristicsService } from './characteristics.service';
import { HospitalService } from './hospital.service';
import { VariableService } from './variable.service';

describe('D3Service', () => {
  let characteristicsServiceSpy;
  let hospitalServiceSpy;
  let variableServiceSpy;
  let d3Service;

  beforeEach(() => {
    const characteristicsSpy = jasmine.createSpyObj('CharacteristicsService',
      ['isCategoricalAttribute', 'isNumericalAttribute', 'getAttributeByName', 'getStringAttributes']);

    const hospitalSpy = jasmine.createSpyObj('HospitalService', ['getHospitalByName', 'getHospitals']);
    const variableSpy = jasmine.createSpyObj('VariableService', ['getValueOfVariable', 'getVariableOfHospitalByAttribute']);

    TestBed.configureTestingModule({
      providers: [
        D3Service,
        { provide: CharacteristicsService, useValue: characteristicsSpy },
        { provide: HospitalService, useValue: hospitalSpy },
        { provide: VariableService, useValue: variableSpy }
      ],
    });

    characteristicsServiceSpy = TestBed.get(CharacteristicsService);
    hospitalServiceSpy = TestBed.get(HospitalService);
    variableServiceSpy = TestBed.get(VariableService);
    d3Service = TestBed.get(D3Service)
  });

  it('should be created', inject([D3Service], (service: D3Service) => {
    expect(service).toBeTruthy();
  }));
});
