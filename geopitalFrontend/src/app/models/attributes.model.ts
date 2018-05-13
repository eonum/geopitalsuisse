export class Attributes {
    _id: String;

    code: String;

    name: {
          de: String;
          fr: String;
          it: String;
    };

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
        //this.attributeType = {code: "", name: {de:"", fr:"", it:""}, group: ""};
        this.code= "";
        this.name={de:"",fr:"",it:""};
        this.value = "";
        // this.address = { street: "", streetNumber: "", plz: "", city: ""};
        // this.attributes = { attributeType: {code: "", name: "", group: ""}, value: ""};

    }


}
