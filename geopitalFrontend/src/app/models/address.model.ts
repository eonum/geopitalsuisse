class Address {

  _id: String;
  hospital: String;
  street: String;
  streetNumber: Number;
  plz: Number;
  city: String;


  constructor(){
    this.hospital = "";
    this.street = "";
    this.streetNumber = 0;
    this.plz=  0;
    this.city = ""
  }

}

export default Address;
