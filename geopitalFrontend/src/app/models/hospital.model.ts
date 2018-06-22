export class Hospital {

  _id: string;
  name: string;
  streetAndNumber: string;
  zipCodeAndCity: string;
  latitude: string;
  longitude: string;
  hospital_attributes: {
    value: string;
    year: number;
    code: string;
  };

  constructor(name, streetAndNumber, zipCodeAndCity, latitude, longitude, attr_code, attr_value, attr_year){
    this.name = name || '';
    this.streetAndNumber = streetAndNumber || '';
    this.zipCodeAndCity = zipCodeAndCity || '';
    this.latitude = latitude || '';
    this.longitude = longitude || '';
    this.hospital_attributes = {
      code: attr_code || '',
      value: attr_value || 0,
      year: attr_year || ''
    };
  }
}
