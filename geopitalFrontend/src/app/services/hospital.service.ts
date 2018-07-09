import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hospital} from '../models/hospital.model';

/**
 * Loads data from backend with the corresponding route defined in backend
 * and puts them in a data array with the help of the defined models so we can access the data.
 */
@Injectable()
export class HospitalService {

  constructor(private http: HttpClient) {}

  /**
   * Gets all hospitals with all corresponding data (address, coordinates, attributes)
   * @returns {Observable<Hospital[]>} data in form of the defined model Hospital
   */
  getAll(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.getUrl() + '/api/hospitals')
    .pipe(
      map(res => {
      return res as Hospital[];
    }));
  }


  /**
   * Gets all dummy hospitals
   * @returns {Observable<Hospital[]>} data in form of the defined model Hospital
   */
  getDummyData(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.getUrl() + '/api/hospital/public/dummy')
      .pipe(
        map(res => {
        return res['data'] as Hospital[];
      }));
  }

  private getUrl(): string {
    if (isDevMode()) {
      return 'http://localhost:3000';
    } else {
      return 'http://geopitalsuisse-backend.eonum.ch';
    }
  }
}
