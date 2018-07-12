import { Variable } from './variable.model';

export class Hospital {

  name: string;
  address: string;
  latitude: string;
  longitude: string;
  typ: string;
  attributes: Array<Variable>;

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.address = data.address || '';
    this.latitude = data.latitude || null;
    this.longitude = data.longitude || null;
    this.typ = data.typ || null;
    this.attributes = (data.variables || []).map((variable) =>
      new Variable(variable));
  }
}
