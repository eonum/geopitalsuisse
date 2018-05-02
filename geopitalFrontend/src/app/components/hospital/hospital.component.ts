import { Component, OnInit } from '@angular/core';
import {Hospital} from "../../models/hospital.model";
import {HospitalService} from "../../services/hospital.service";

/**
 * Used for experimenting with the dummy data from backend.
 * At the moment not in use.
 */

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  hospitals: any[] = [];
  public hospitalList: Hospital[] = [];

  constructor(
    private hospitalService: HospitalService
  ) { }

  /**
   * Loads all dummy hospital data from backend with the help of hospitalService
   */
  ngOnInit() {
    this.hospitalService.getDummyData()
      .subscribe(hospitals => {
        console.log(hospitals);
        this.hospitalList = hospitals;
      });
  }

  showHp(): void {
    console.log(this.hospitalList);
  }

}

