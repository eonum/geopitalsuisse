import Characteristics from '../models/characteristics.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CharacteristicsService {

  api_url = 'http://localhost:3000';
  characteristicsUrl = `${this.api_url}/api/characteristics`;

  constructor(
    private http: HttpClient
  ) { }

}
