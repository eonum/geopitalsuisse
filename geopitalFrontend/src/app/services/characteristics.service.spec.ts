import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { CharacteristicsService } from './characteristics.service';
import { Attribute } from '../models/attribute.model';

import { StringAttributes } from '../../mocks/data/mock-string-attributes';
import { NumericalAttributes } from '../../mocks/data/mock-numerical-attributes';


describe('CharacteristicsService', () => {

  let service: CharacteristicsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const testUrl = 'http://qm1.ch/de';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacteristicsService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(CharacteristicsService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get string attributes', () => {
    httpClient.get<Array<Attribute>>(testUrl + '/api/geopital/string_attributes').subscribe((attributes: Array<Attribute>) => {
      expect(attributes).toEqual(StringAttributes);
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(testUrl +  '/api/geopital/string_attributes');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(StringAttributes);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });


  it('should get number attributes', () => {
    httpClient.get<Array<Attribute>>(testUrl + '/api/geopital/number_attributes').subscribe((attributes: Array<Attribute>) => {
      expect(attributes).toEqual(NumericalAttributes);
    });

    const req = httpTestingController.expectOne(testUrl + '/api/geopital/number_attributes');

    expect(req.request.method).toEqual('GET');

    req.flush(NumericalAttributes);

    httpTestingController.verify();
  });

  it('should get attribute by code', () => {
    httpClient.get<Attribute>(testUrl +  '/api/geopital/attribute?name=' + StringAttributes[0].code).subscribe((attribute: Attribute) => {
      expect(attribute).toEqual(StringAttributes[0]);
    });

    const req = httpTestingController.expectOne(testUrl + '/api/geopital/attribute?name=' + StringAttributes[0].code);

    expect(req.request.method).toEqual('GET');

    req.flush(StringAttributes[0]);

    httpTestingController.verify();
  });

  it('should know that attribute is numerical attribute', () => {
    expect(CharacteristicsService.isNumericalAttribute(NumericalAttributes[0])).toBeTruthy();
    expect(CharacteristicsService.isCategoricalAttribute(NumericalAttributes[0])).toBeFalsy();
  });

  it('should know that attribute is string attribute', () => {
    expect(CharacteristicsService.isNumericalAttribute(StringAttributes[0])).toBeFalsy();
    expect(CharacteristicsService.isCategoricalAttribute(StringAttributes[0])).toBeTruthy();
  });
});
