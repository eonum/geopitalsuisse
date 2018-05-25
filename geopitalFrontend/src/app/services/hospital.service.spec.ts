import { TestBed, inject } from '@angular/core/testing';
import { HospitalService } from './hospital.service';
import { HttpClient } from "@angular/common/http";

describe('HospitalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HospitalService,
        HttpClient]
    });
  });

  it('should be created', inject([HospitalService], (service: HospitalService) => {
    expect(service).toBeTruthy();
  }));
});
