export class Attributes {
    _id: String;

    code: String;
    category: String;

    nameDE: String;
    nameFR: String;
    nameIT: String;

    // attributes: {
    //     attributeType: {
    //         code: String;
    //         name: String;
    //         group: String;
    //       }
    //     value: String;
    //   }

    constructor(){
        //this.attributeType = {code: "", name: {de:"", fr:"", it:""}, group: ""};
        this.code= "";
        this.category = "";
        this.nameDE="";
        this.nameFR="";
        this.nameIT="";
        // this.address = { street: "", streetNumber: "", plz: "", city: ""};
        // this.attributes = { attributeType: {code: "", name: "", group: ""}, value: ""};

    }


}
