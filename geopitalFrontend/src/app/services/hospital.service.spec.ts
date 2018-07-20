import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http'

import { HospitalService } from './hospital.service';
import { Hospital } from '../models/hospital.model';
import { Hospitals } from '../../mocks/data/mock-hospitals';
import { Observable, of } from "rxjs/index";

describe('HospitalService', () => {

  let hospitalService: HospitalService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let testUrl = 'http://qm1.ch/de';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HospitalService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    hospitalService = TestBed.get(HospitalService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(hospitalService).toBeTruthy();
  });

  it('should get hospitals', () => {
    httpClient.get<Array<Hospitals>>(testUrl + '/api/geopital/hospitals').subscribe((hospitals: Array<Hospital>) => {
      expect(hospitals).toEqual(Hospitals)
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(testUrl +  '/api/geopital/hospitals');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(Hospitals);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();


  });

  it('should get hospital by name', () => {
    httpClient.get<Hospital>(testUrl + '/api/geopital/hospital_by_name?name=' + Hospitals[0].name).subscribe((hospital: Hospital) => {
      expect(hospital).toEqual(Hospitals[0])
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(testUrl +  '/api/geopital/hospital_by_name?name=' + Hospitals[0].name);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(Hospitals);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();


  });

  /*
  it('should get hospital by name', () => {
    hospitalService.getHospitalByName(Hospitals[0].name).subscribe((hospital: Hospital) => {
      expect(hospital).toEqual(Hospitals[0])
    })
  });
  */

});
