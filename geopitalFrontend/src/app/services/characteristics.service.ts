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
    return attribute.variable_type === 'string';
  }

  static isNumericalAttribute(attribute: Attribute): boolean {
    return attribute.variable_type === 'number' || attribute.variable_type === 'percentage';
  }

  /**
   * Gets all attributes
   * @returns {Observable<Array<Attribute>>} array of Attributes
   */
  getAttributes(): Observable<Array<Attribute>> {
    return this.http.get<Array<Attribute>>(this.getUrl() + '/api/geopital/attributes')
      .pipe(
        map( res => res.map((attribute: Attribute) => new Attribute(attribute)))
      );
  }

  /**
   * Gets all string attributes
   * @returns {Observable<Array<Attribute>>} array of Attributes
   */
  getStringAttributes(): Observable<Array<Attribute>> {
    return this.http.get<Array<Attribute>>(this.getUrl() + '/api/geopital/string_attributes')
      .pipe(
        map( res => res.map((attribute: Attribute) => new Attribute(attribute)))
      );
  }

  /**
   * Gets all string attributes
   * @returns {Observable<Array<Attribute>>} array of Attributes
   */
  getNumberAttributes(): Observable<Array<Attribute>> {
    return this.http.get<Array<Attribute>>(this.getUrl() + '/api/geopital/number_attributes')
      .pipe(
        map( res => res.map((attribute: Attribute) => new Attribute(attribute)))
      );
  }

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
