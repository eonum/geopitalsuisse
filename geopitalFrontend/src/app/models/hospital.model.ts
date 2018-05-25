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

  hospital_locations: {
    name: String;
    streetAndNumber: String;
    plzAndCity: String;
    latitude: String;
    longitude: String;
    la: String;
    kanton: String;
  }

  constructor(){
    this.name = "";
    this.streetAndNumber = "";
    this.plzAndCity = "";
    this.latitude = "";
    this.longitude = "";
    this.hospital_attributes = { code: "", value: "", year: 0};
    this.hospital_locations = {name: "", streetAndNumber: "", plzAndCity: "", latitude: "", longitude: "", la: "", kanton: ""}
  }
}
