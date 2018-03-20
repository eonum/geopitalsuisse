import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit{
  title: string = 'geopital suisse';
  lat: number = 46.818188;
  lng: number = 8.227512

  constructor(private http: HttpClient){

  }

  /**
   * Gives a "connection refused" error
   * Infos from: https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
   */
  ngOnInit(): void {
    /*this.http.get('https://localhost:3000').subscribe(data => {
      console.log(data);
    });*/
  }
}
