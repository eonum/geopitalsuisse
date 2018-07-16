import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hospital} from '../models/hospital.model';

/**
 * Loads data from qualimed-hospital.
 */
@Injectable()
export class HospitalService {

  private hospitals: Array<Hospital> = null;

  constructor(private http: HttpClient) {}

  /**
   * Gets all hospitals from qualimed-hospital.
   * @returns {Observable<Array<Hospital>>}
   */
  getHospitals(): Observable<Array<Hospital>> {

    if (this.hospitals) {
      return of(this.hospitals)
    } else {
      return this.http.get<Array<Hospital>>(HospitalService.getUrl() + '/api/geopital/hospitals')
        .pipe(
          map( res => {
            this.hospitals = res.map((hospital: Hospital) => new Hospital(hospital));
            return this.hospitals;
          })
        )
    }
  };

  // Todo: replace 'de' with current locale
  private static getUrl(): string {
    if (isDevMode()) {
      return 'http://localhost:3000/de';
    } else {
      return 'http://qm1.ch/de';
    }
  }
}
