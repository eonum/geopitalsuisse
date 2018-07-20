import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http'

import { CharacteristicsService } from './characteristics.service';
import { Attribute } from '../models/attribute.model';
import { Observable, of } from "rxjs/index";

import { StringAttributes } from '../../mocks/data/mock-string-attributes';
import { NumericalAttributes } from '../../mocks/data/mock-numerical-attributes';

class MockCharacteristicsService {
  static getStringAttributes(): Observable<Array<Attribute>> {
    return of(StringAttributes);
  }

  static getNumberAttributes(): Observable<Array<Attribute>> {
    return of(NumericalAttributes);
  }

  getAttributeByName(name: string): Observable<Attribute> {
    return of(NumericalAttributes.filter(obj => obj.code === name)[0])
  }

  static isCategoricalAttribute(attribute: Attribute): boolean {
    return attribute.variable_type === 'string';
  }

  static isNumericalAttribute(attribute: Attribute): boolean {
    return attribute.variable_type === 'number' || attribute.variable_type === 'percentage';
  }
}

describe('CharacteristicsService', () => {

  let service: CharacteristicsService;
  let client: HttpClient;

  const stringAttributes = StringAttributes;
  const numericalAttributes = NumericalAttributes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CharacteristicsService, useClass: MockCharacteristicsService }
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(CharacteristicsService);
    client = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get string attributes', () => {
    MockCharacteristicsService.getStringAttributes().subscribe((attributes: Array<Attribute>) => {
      expect(attributes).toBeDefined();
      expect(attributes).toEqual(stringAttributes)
    });
  });


  it('should get number attributes', () => {
    MockCharacteristicsService.getNumberAttributes().subscribe((attributes: Array<Attribute>) => {
      expect(attributes).toBeDefined();
      expect(attributes).toEqual(numericalAttributes)
    });
  });

  it('should get attribute by name', () => {
    service.getAttributeByName(numericalAttributes[0].code).subscribe((attribute: Attribute) => {
      expect(attribute).toBeDefined();
      expect(attribute).toEqual(numericalAttributes[0])
    });
  });

  it('should know that attribute is numerical attribute', () => {
    expect(MockCharacteristicsService.isNumericalAttribute(numericalAttributes[0])).toBeTruthy();
    expect(MockCharacteristicsService.isCategoricalAttribute(numericalAttributes[0])).toBeFalsy();
  });

  it('should know that attribute is string attribute', () => {
    expect(MockCharacteristicsService.isNumericalAttribute(stringAttributes[0])).toBeFalsy();
    expect(MockCharacteristicsService.isCategoricalAttribute(stringAttributes[0])).toBeTruthy();
  });
});
