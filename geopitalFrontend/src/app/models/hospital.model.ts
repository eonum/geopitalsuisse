export class Hospital {

  _id: String;
  year: number;
  name: String;
  address:{
    street: String;
    streetNumber: String;
    plz: String;
    city: String;
  }

  coordinates: {
    latitude: String;
    longitude: String;
  }

  //attributes: any[];
  attributes: {
    value: String;
    name: String[];
    code: String;
  }

  constructor(){
    this.year = 0;
    this.name = "";
    this.address = { street: "", streetNumber: "", plz: "", city: ""};
    this.coordinates = { latitude: "", longitude: ""};
    // this.attributes = { attributeType: { code: "", name: "", group: ""}, value: ""};
  }

}
