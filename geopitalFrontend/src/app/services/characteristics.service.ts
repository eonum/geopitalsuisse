import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attributes } from "../models/attributes.model";
import 'rxjs/add/operator/map';

@Injectable()
export class CharacteristicsService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) {
}

  /**
   * Gets all categorical attributes of all hospitals
   * @returns {Observable<Attributes[]>} data in form of the defined model Attributes
   */
  getCategoricalAttributes(): Observable<Attributes[]> {
    return this.http.get<Attributes[]>('https://geopital.herokuapp.com/' + 'api/attributeTypes')
      .map(res => {
        return res['attribute_types_string'] as Attributes[];
      })
  }

  /**
   * Gets all categorical attributes of all hospitals
   * @returns {Observable<Attributes[]>} data in form of the defined model Attributes
   */
  getNumericalAttributes(): Observable<Attributes[]> {
    return this.http.get<Attributes[]>('https://geopital.herokuapp.com/' + 'api/attributeTypes')
      .map(res => {
        return res['attribute_types_number'] as Attributes[];
      })
  }
}
