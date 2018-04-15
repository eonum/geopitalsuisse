export class Attributes {
    _id: String;
    attributeType: {
        code: String;
        name: String;
        group: String;
    }

    address:{
        street: String;
        streetNumber: String;
        plz: String;
        city: String;
      }

    value: String;
    // attributes: {
    //     attributeType: {
    //         code: String;
    //         name: String;
    //         group: String;
    //       }
    //     value: String;
    //   }

    constructor(){
        this.attributeType = {code: "", name: "", group: ""};
        this.value = "";
        this.address = { street: "", streetNumber: "", plz: "", city: ""};
        // this.attributes = { attributeType: {code: "", name: "", group: ""}, value: ""};

    }


}