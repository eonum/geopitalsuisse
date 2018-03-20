import { Address } from '../models/address.model';

export class Characteristics {
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
