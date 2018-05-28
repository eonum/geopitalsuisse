import {Attributes} from "../app/models/attributes.model";
import {Observable} from "rxjs/Rx";

const ATTRIBUTES_STRING = [new Attributes("KT", "string", "Kanton", "Cantone", "Cantone"), new Attributes("Typ", "string", "Spitaltyp", "Typ de l'hôpital", "Tipo ospedale")]
const ATTRIBUTES_NUMERIC = [new Attributes("Gebs", "number", "Gebärsäle", "Gebärsäle", "sale parto"), new Attributes("Ops", "number", "Operationssäle", "salles d’opération", "Sale operatorie")]

export class MockCharacteristicsService {

  public getCategoricalAttributes(): Observable<Attributes[]> {
    return Observable.of(ATTRIBUTES_STRING)
  }

  public getNumericalAttributes(): Observable<Attributes[]> {
    return Observable.of(ATTRIBUTES_NUMERIC)
  }
}
