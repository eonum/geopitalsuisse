import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Hospital} from '../models/hospital.model';

/**
 * Loads data from backend with the corresponding route defined in backend
 * and puts them in a data array with the help of the defined models so we can access the data.
 */
@Injectable()
export class HospitalService {

  constructor(private http: HttpClient) {
  }

  /**
   * Gets all hospitals with all corresponding data (address, coordinates, attributes)
   * @returns {Observable<Hospital[]>} data in form of the defined model Hospital
   */
  getAll(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>('https://geopital.herokuapp.com/api/hospitals')
    .map(res => {
      return res as Hospital[];
    })

  }


  /**
   * Gets all dummy hospitals
   * @returns {Observable<Hospital[]>} data in form of the defined model Hospital
   */
  getDummyData(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>('http://localhost:3000/' + 'api/hospital/public/dummy')
      .map(res => {
        return res['data'] as Hospital[];
      })
  }
}
