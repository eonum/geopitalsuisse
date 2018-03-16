import Map from '../models/map.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class MapService {

  api_url = 'http://localhost:3000';
  mapUrl = `${this.api_url}/api/map`;

  constructor(
    private http: HttpClient
  ) { }
}
