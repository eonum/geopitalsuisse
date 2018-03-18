import Hospital from '../models/hospital.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class CharacteristicsService {

  api_url = 'http://localhost:3000';
  hospitalUrl = `${this.api_url}/api/hospital`;
  data: any = {};


  /**
   * Injects HTTP Client
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

}
