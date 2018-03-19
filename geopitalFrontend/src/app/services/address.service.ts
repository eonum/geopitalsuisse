import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Address} from "../Interfaces/address.type";

@Injectable()
export class AddressService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Address[]> {
    return this.http.get<Address[]>('http://localhost:3000/' + 'Address')
  }

}
