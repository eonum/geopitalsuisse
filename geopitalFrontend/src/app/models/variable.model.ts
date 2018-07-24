export class Variable {
  code: {
    value: any,
  };

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}
