import {AfterViewChecked, Component, OnInit} from '@angular/core';
declare function test(): any;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, AfterViewChecked {
  lat: number = 46.818188;
  lng: number = 8.227512;
  lat1: number = 46.9490830802915;
  lng1: number = 7.426111180291502;
  lat2: number = 47.3781037802915;
  lng2: number = 8.552398080291503;

  constructor() { }

  ngOnInit() {
    setTimeout(function () {
      test();
    }, 500);
  }

  ngAfterViewChecked() {
  }

}
