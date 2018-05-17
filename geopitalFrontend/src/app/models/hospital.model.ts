export class Hospital {

  _id: String;
  name: String;
  streetAndNumber: String;
  plzAndCity: String;
  latitude: String;
  longitude: String;


  //attributes: any[];
  hospital_attributes: {
    value: String;
    year: number;
    code: String;
  }

  constructor(){
    this.name = "";
    this.streetAndNumber = "";
    this.plzAndCity = "";
    this.latitude = "";
    this.longitude = "";
    //this.attributes = { attributeType: { code: "", name: "", group: ""}, value: ""};
  }

}
