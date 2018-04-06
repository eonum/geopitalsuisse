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
  // plz: String;
  // street: String;
  // streetNumber: String;
  // address: String;
  coordinates: {
    latitude: String;
    longitude: String;
  }
  

  constructor(){
    this.year = 0;
    this.name = "";
  }

}
