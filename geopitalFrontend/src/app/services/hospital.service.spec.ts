import { TestBed, inject } from '@angular/core/testing';
import { HospitalService } from './hospital.service';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital.model';



describe('HospitalService', () => {

  let hospitalService: HospitalService;
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HospitalService,
        HttpClient
      ],
      imports: [
        HttpClientModule,
      ]
    });
  });

  beforeEach(() => {
    hospitalService = new HospitalService(client);

  });

  it('should be created', inject([HospitalService], (service: HospitalService) => {
    expect(service).toBeTruthy();
  }));

  it('should not be empty', inject([HospitalService], (service: HospitalService) => {
    const hospitals = service.getAll();
    expect(hospitals).toBeDefined();
  }));

  it('should match the hospital', inject([HospitalService], (service: HospitalService) => {
    const hospitals = service.getAll();
    expect(hospitals[1]).toBe(Hospital[1]);
    expect(hospitals[150]).toBe(Hospital[150]);
    expect(hospitals[176]).toBe(Hospital[176]);
  }));

});
