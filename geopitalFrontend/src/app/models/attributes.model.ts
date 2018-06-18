export class Attributes {

    _id: String;
    code: String;
    category: String;
    nameDE: String;
    nameFR: String;
    nameIT: String;

    constructor(code, category, nameDE, nameFR, nameIT){
      this.code = code;
      this.category = category;
      this.nameDE = nameDE;
      this.nameFR = nameFR;
      this.nameIT = nameIT;
    }
}
