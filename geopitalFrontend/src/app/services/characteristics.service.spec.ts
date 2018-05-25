import { TestBed, inject } from '@angular/core/testing';
import { CharacteristicsService } from './characteristics.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Attributes } from "../models/attributes.model";


describe('CharacteristicsService', () => {

  let service: CharacteristicsService;
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacteristicsService,
        HttpClient],
      imports: [
        HttpClientModule
      ]
    });
  });

  beforeEach(() => {
    service = new CharacteristicsService(client);
  });

  it('should be created', inject([CharacteristicsService], (service: CharacteristicsService) => {
    expect(service).toBeTruthy();
  }));

  it('catAttr should not be empty', inject([CharacteristicsService], (service: CharacteristicsService) => {
    const catAttr = service.getCategoricalAttributes();
    expect(catAttr).toBeDefined();
  }));

  it('should match the categorical attribute', inject([CharacteristicsService], (service: CharacteristicsService) => {
    const catAttr = service.getCategoricalAttributes();
    expect(catAttr[1]).toBe(Attributes[1]);
    expect(catAttr[150]).toBe(Attributes[150]);
    expect(catAttr[176]).toBe(Attributes[176]);
  }));

  it('numAttr should not be empty', inject([CharacteristicsService], (service: CharacteristicsService) => {
    const numAttr = service.getNumericalAttributes();
    expect(numAttr).toBeDefined();
  }));

  it('should match the numerical attribute', inject([CharacteristicsService], (service: CharacteristicsService) => {
    const numAttr = service.getNumericalAttributes();
    expect(numAttr[1]).toBe(Attributes[1]);
    expect(numAttr[150]).toBe(Attributes[150]);
    expect(numAttr[176]).toBe(Attributes[176]);
  }));

});
