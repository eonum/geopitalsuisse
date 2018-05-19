// import { Characteristics } from '../models/characteristics.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Attributes } from "../models/attributes.model";

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
