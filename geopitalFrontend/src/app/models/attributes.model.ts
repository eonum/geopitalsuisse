export class Attributes {

    _id: String;

    code: String;
    category: String;

    nameDE: String;
    nameFR: String;
    nameIT: String;

    /*constructor(){
        this.code= "";
        this.category = "";
        this.nameDE="";
        this.nameFR="";
        this.nameIT="";
    }*/

    constructor(code, category, nameDE, nameFR, nameIT){
      this.code = code;
      this.category = category;
      this.nameDE = nameDE;
      this.nameFR = nameFR;
      this.nameIT = nameIT;
    }
}
