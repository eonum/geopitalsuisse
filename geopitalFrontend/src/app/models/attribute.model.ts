export class Attribute {

  code: string;
  variable_type: string;
  values: Array<string>;
  values_de: Array<string>;
  values_fr: Array<string>;
  values_it: Array<string>;
  variable_sets: Array<string>;
  name_de: string;
  name_fr: string;
  name_it: string;
  multiclass: boolean;

  constructor(data: any = {}) {
    this.code = data.code || '';
    this.variable_type = data.variable_type || '';
    this.values = data.values || [];
    this.values_de = data.values_de || [];
    this.values_fr = data.values_fr || [];
    this.values_it = data.values_it || [];
    this.variable_sets = data.variable_sets || [];
    this.name_de = data.name_de || '';
    this.name_fr = data.name_fr || '';
    this.name_it = data.name_it || '';
    this.multiclass = data.multiclass || false;
  }
}
