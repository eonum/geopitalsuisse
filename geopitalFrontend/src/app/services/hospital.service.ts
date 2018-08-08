import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hospital } from '../models/hospital.model';

/**
 * Loads data from qualimed-hospital.
 */
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private hospitals: Array<Hospital> = null;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
  ) {}


  /**
   * Gets all hospitals from qualimed-hospital.
   * @returns {Observable<Array<Hospital>>}
   */
  getHospitals(): Observable<Array<Hospital>> {
    if (this.hospitals) {
      return of(this.hospitals);
    } else {
      return this.http.get<Array<Hospital>>(this.getUrl() + '/api/geopital/hospitals')
        .pipe(
          map( res => {
            this.hospitals = res.map((hospital: Hospital) => new Hospital(hospital));
            return this.hospitals;
          })
        );
    }
  }

  getHospitalByName(name: string): Observable<Hospital> {
    return this.http.get<Hospital>(this.getUrl() + '/api/geopital/hospital_by_name?name=' + name)
      .pipe(
        map(res => new Hospital(res))
      );
  }

  private getUrl(): string {
    if (isDevMode()) {
      return 'http://localhost:3000/' + this.translate.currentLang;
    } else {
      return 'https://qm1.ch/' + this.translate.currentLang;
    }
  }
}
