import { Injectable } from '@angular/core';
//import { Article } from './article.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import Hospital from "../models/hospital.model";
import {environment} from "../../environments/environment";

@Injectable()
export class HospitalService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAll(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>('http://localhost:3000/' + 'Hospital')
  }

  getDummyData(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>('http://localhost:3000/' + '/api/geopital')
  }

}



/*
@Injectable()
export class ArticleService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.apiUrl + 'article')
  }

  getById(id: number): Observable<Article> {
    return this.http.get<Article>(environment.apiUrl + 'article/' + id)
  }

  getByAuthor(author: number): Observable<Article> {
    return this.http.get<Article>( environment.apiUrl + 'article?author=' + author)
  }

  update(article: Article): Observable<Article> {
    return this.http.put<Article>(
      environment.apiUrl + 'article/' + article.id,
      article, { headers: this.headers });
  }

}*/

