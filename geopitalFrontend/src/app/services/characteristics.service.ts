import { Characteristics } from '../models/characteristics.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Hospital } from '../models/hospital.model';

@Injectable()
export class CharacteristicsService {

  api_url = 'http://localhost:3000';
  characteristicUrl = `${this.api_url}/api/geopital`;

  constructor(
    private http: HttpClient
  ) { }

  getDummyData(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>('http://localhost:3000/' + 'api/geopital')
      .map(res => {
        return res['data'] as Hospital[];
      })
  }

  /* getHospitalCharacteristics(): Observable<Hospital[]>{
    return this.http.get(this.characteristicUrl)
    .map(res  => {
      //Maps the response object sent from the server

      return res["data"].docs as Hospital[];
    })
} */
}
