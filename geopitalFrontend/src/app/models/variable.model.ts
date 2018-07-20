export class Variable {
  code: {
    value: any,
    years: {}
  };

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}
