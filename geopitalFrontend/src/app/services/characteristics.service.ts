import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Attribute } from '../models/attribute.model';

@Injectable()
export class CharacteristicsService {

  constructor(private http: HttpClient) {}

  /**
   * Gets all attributes
   * @returns {Observable<Array<Attribute>>} array of Attributes
   */
  getAttributes(): Observable<Array<Attribute>> {
    return this.http.get<Array<Attribute>>(CharacteristicsService.getUrl() + '/api/geopital/attributes')
      .pipe(
        map( res => res.map((attribute: Attribute) => new Attribute(attribute)))
      );
  }

  static isCategoricalAttribute(attribute): boolean {
    return attribute.variable_type === 'string'
  }

  static isNumericalAttribute(attribute): boolean {
    return attribute.variable_type === 'number'

  }

  /* Todo: replace 'de' with current locale */
  private static getUrl(): string {
    if (isDevMode()) {
      return 'http://localhost:3000/de';
    } else {
      return 'qm1.ch/de';
    }
  }

}
