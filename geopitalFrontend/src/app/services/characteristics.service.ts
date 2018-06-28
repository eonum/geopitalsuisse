import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Attribute } from '../models/attribute.model';

@Injectable()
export class CharacteristicsService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  private categoricalAttributes;
  private numericalAttributes;
  /**
   * Gets all categorical attributes of all hospitals
   * @returns {Observable<Attributes[]>} data in form of the defined model Attributes
   */
  getCategoricalAttributes(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>('http://geopitalsuisse-backend.eonum.ch/api/attributeTypes')
      .map(res => {
        this.categoricalAttributes = res['attribute_types_string'] as Attribute[];
        return res['attribute_types_string'] as Attribute[];
      });
  }

  /**
   * Gets all categorical attributes of all hospitals
   * @returns {Observable<Attributes[]>} data in form of the defined model Attributes
   */
  getNumericalAttributes(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>('http://geopitalsuisse-backend.eonum.ch/api/attributeTypes')
      .map(res => {
        this.numericalAttributes = res['attribute_types_number'] as Attribute[];
        return res['attribute_types_number'] as Attribute[];
      });
  }

  isCategoricalAttribute(attribute): boolean {
    const position = this.categoricalAttributes.findIndex(cur => {
      return Object.keys(attribute).every(function (key) {
        return attribute[key] === cur[key];
      });
    });

    return position > -1;

  }

  isNumericalAttribute(attribute): boolean {
    const position = this.numericalAttributes.findIndex(cur => {
      return Object.keys(attribute).every(function (key) {
        return attribute[key] === cur[key];
      });
    });

    return position > -1;
  }

}
