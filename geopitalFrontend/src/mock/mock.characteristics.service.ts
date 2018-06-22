import {Attribute} from "../app/models/attribute.model";
import {Observable} from "rxjs/Rx";

const ATTRIBUTES_STRING = [new Attribute("KT", "string", "Kanton", "Cantone", "Cantone"), new Attribute("Typ", "string", "Spitaltyp", "Typ de l'hôpital", "Tipo ospedale")]
const ATTRIBUTES_NUMERIC = [new Attribute("Gebs", "number", "Gebärsäle", "Gebärsäle", "sale parto"), new Attribute("Ops", "number", "Operationssäle", "salles d’opération", "Sale operatorie")]

export class MockCharacteristicsService {

  public getCategoricalAttributes(): Observable<Attribute[]> {
    return Observable.of(ATTRIBUTES_STRING)
  }

  public getNumericalAttributes(): Observable<Attribute[]> {
    return Observable.of(ATTRIBUTES_NUMERIC)
  }
}
