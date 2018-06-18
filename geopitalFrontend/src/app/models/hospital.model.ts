export class Hospital {

  _id: String;
  name: String;
  streetAndNumber: String;
  zipCodeAndCity: String;
  latitude: String;
  longitude: String;
  hospital_attributes: {
    value: String;
    year: number;
    code: String;
  }

  constructor(name, streetAndNumber, zipCodeAndCity, latitude, longitude, attr_code, attr_value, attr_year){
    this.name = name;
    this.streetAndNumber = streetAndNumber;
    this.zipCodeAndCity = zipCodeAndCity;
    this.latitude = latitude;
    this.longitude = longitude;
    this.hospital_attributes = { code: attr_code, value: attr_code, year: attr_year};
  }
}
