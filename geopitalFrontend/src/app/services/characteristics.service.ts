import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Attribute } from '../models/attribute.model';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicsService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {}

  static isCategoricalAttribute(attribute: Attribute): boolean {
    return attribute.variable_type === 'string' || attribute.variable_type === 'enum';
  }

  static isNumericalAttribute(attribute: Attribute): boolean {
    return attribute.variable_type === 'number' || attribute.variable_type === 'percentage';
  }

  /**
   * Gets all numerical attributes (type enum)
   * @returns {Observable<Array<Attribute>>} array of Attributes
   */
  getEnumAttributes(): Observable<Array<Attribute>> {
    return this.http.get<Array<Attribute>>(this.getUrl() + '/api/geopital/enum_attributes')
      .pipe(
        map( res => res.map((attribute: Attribute) => new Attribute(attribute)))
      );
  }

  /**
   * Gets all numerical attributes (type number or percentage)
   * @returns {Observable<Array<Attribute>>} array of Attributes
   */
  getNumberAttributes(): Observable<Array<Attribute>> {
    return this.http.get<Array<Attribute>>(this.getUrl() + '/api/geopital/number_attributes')
      .pipe(
        map( res => res.map((attribute: Attribute) => new Attribute(attribute)))
      );
  }

  /**
   * Gets an attribute by its name
   * @param {string} name name of the attribute
   * @returns {Observable<Attribute>}
   */
  getAttributeByName(name: string): Observable<Attribute> {
    return this.http.get<Attribute>(this.getUrl() + '/api/geopital/attribute?name=' + name)
    .pipe(
      map(res => new Attribute(res))
    );
  }

  private getUrl(): string {
    if (isDevMode()) {
      return 'http://localhost:3000/' + this.translate.currentLang;
    } else {
      return 'qm1.ch/'  + this.translate.currentLang;
    }
  }
}
