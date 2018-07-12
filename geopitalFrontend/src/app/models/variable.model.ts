export class Variable {
  code: {
    value: any,
    years: { 2012: any, 2013: any }
  };

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}
