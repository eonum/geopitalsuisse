//import { Hospital } from '../models/hospital.model';

export class Characteristics {
  _id: string;
  year: number;
  name: string;
  streetAndNumber: String;
  plzAndCity: String;


  constructor(
  ){
    this.year = 0;
    this.name = "";
    this.streetAndNumber = "";
    this.plzAndCity = "";
  }

}
