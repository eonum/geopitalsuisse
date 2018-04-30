import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Hospital} from '../models/hospital.model';
import { Characteristics} from '../models/characteristics.model';
import 'rxjs/add/operator/map';
import {environment} from "../../environments/environment";
import { Attribute } from '@angular/compiler/src/core';
import { Attributes } from '../models/attributes.model';

@Injectable()
export class HospitalService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private attributes = [];

  constructor(private http: HttpClient) { }

  // gets all hospitals with all corresponding data (address, coordinates, attributes)
  getAll(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>('http://localhost:3000/' + 'api/hospital/all/data')
    .map(res => {
      return res['data'] as Hospital[];
    })
  }

  getAttributes(hospitalId): Observable<Attributes>{
    //console.log('http://localhost:3000/' + 'api/hospital/' + hospitalId);
    return this.http.get<Attributes>('http://localhost:3000/' + 'api/hospital/' + hospitalId)
    .map(res => {
      return res['data'] as Attributes;
    })
  }
  
  getDummyData(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>('http://localhost:3000/' + 'api/hospital/public/dummy')
      .map(res => {
        return res['data'] as Hospital[];
      })
  }

}

