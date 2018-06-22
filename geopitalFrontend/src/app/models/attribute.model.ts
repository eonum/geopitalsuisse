export class Attribute {

    _id: string;
    code: string;
    category: string;
    nameDE: string;
    nameFR: string;
    nameIT: string;

    constructor(code, category, nameDE, nameFR, nameIT){
      this.code = code;
      this.category = category;
      this.nameDE = nameDE;
      this.nameFR = nameFR;
      this.nameIT = nameIT;
    }
}
