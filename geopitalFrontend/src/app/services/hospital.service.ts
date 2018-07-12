import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hospital} from '../models/hospital.model';

/**
 * Loads data from qualimed-hospital.
 */
@Injectable()
export class HospitalService {

  constructor(private http: HttpClient) {}

  /**
   * Gets all hospitals from qualimed-hospital.
   * @returns {Observable<Array<Hospital>>}
   */
  getHospitals(): Observable<Array<Hospital>> {
    return this.http.get<Array<Hospital>>(this.getUrl() + '/api/geopital/hospitals')
    .pipe(
      map( res => res.map((hospital: Hospital) => new Hospital(hospital)))
  )};



  // Todo: replace 'de' with current locale
  private getUrl(): string {
    if (isDevMode()) {
      return 'http://localhost:3000/de';
    } else {
      return 'http://qm1.ch/de';
    }
  }
}
