import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { Attribute } from '../app/models/attribute.model';

const ATTRIBUTES_STRING = [
  new Attribute('KT', 'string', 'Kanton', 'Cantone', 'Cantone'),
  new Attribute('Typ', 'string', 'Spitaltyp', 'Typ de l\'hôpital', 'Tipo ospedale')
];

const ATTRIBUTES_NUMERIC = [
  new Attribute('Gebs', 'number', 'Gebärsäle', 'Gebärsäle', 'sale parto'),
  new Attribute('Ops', 'number', 'Operationssäle', 'salles d’opération', 'Sale operatorie')
];

export class MockCharacteristicsService {

  public static getCategoricalAttributes(): Observable<Attribute[]> {
    return of(ATTRIBUTES_STRING);
  }

  public static getNumericalAttributes(): Observable<Attribute[]> {
    return of(ATTRIBUTES_NUMERIC);
  }
}
