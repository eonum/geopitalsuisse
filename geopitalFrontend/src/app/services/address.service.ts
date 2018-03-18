import Map from '../models/address.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import Hospital from "../models/hospital.model";

@Injectable()
export class AddressService {

  api_url = 'http://localhost:3000';
  addressUrl = `${this.api_url}/api/address`;

  constructor(private http: HttpClient) {

  }

}
