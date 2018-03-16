import Characteristics from '../models/characteristics.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class CharacteristicsService {

  api_url = 'http://localhost:3000';
  characteristicsUrl = `${this.api_url}/api/characteristics`;
  data: any = {};


  /**
   * Injects HTTP Client
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {

  }

}
