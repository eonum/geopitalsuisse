import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  lat: number = 46.818188;
  lng: number = 8.227512

  constructor() { }

  ngOnInit() {
  }

}
