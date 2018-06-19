import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attribute } from "../models/attribute.model";
import 'rxjs/add/operator/map';

@Injectable()
export class CharacteristicsService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  /**
   * Gets all categorical attributes of all hospitals
   * @returns {Observable<Attributes[]>} data in form of the defined model Attributes
   */
  getCategoricalAttributes(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>('https://geopital.herokuapp.com/' + 'api/attributeTypes')
      .map(res => {
        return res['attribute_types_string'] as Attribute[];
      })
  }

  /**
   * Gets all categorical attributes of all hospitals
   * @returns {Observable<Attributes[]>} data in form of the defined model Attributes
   */
  getNumericalAttributes(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>('https://geopital.herokuapp.com/' + 'api/attributeTypes')
      .map(res => {
        return res['attribute_types_number'] as Attribute[];
      })
  }
}
