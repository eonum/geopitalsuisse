import Address from '../models/address.model';

class Characteristics {
  _id: string;
  year: number;
  name: string;
  address: Address;


  constructor(
  ){
    this.year = 0;
    this.name = "";
    this.address = new Address();
  }

}

export default Characteristics;
