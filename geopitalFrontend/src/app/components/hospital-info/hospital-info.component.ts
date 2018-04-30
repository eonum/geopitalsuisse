import { Component, OnInit } from '@angular/core';

/**
 * todo: this should be an info-box if you click on a hospital you should see important informations about the hospital
 * as example: umsatz. anzahl betten, geräte etc.
 */

@Component({
  selector: 'app-hospital-info',
  templateUrl: './hospital-info.component.html',
  styleUrls: ['./hospital-info.component.css']
})
export class HospitalInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
