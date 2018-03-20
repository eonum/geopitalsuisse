import { Component, OnInit } from '@angular/core';
import {Hospital} from "../../models/hospital.model";
import {HospitalService} from "../../services/hospital.service";

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  hospitals: Hospital[] = [];

  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.hospitalService.getDummyData().subscribe((data) => {
      this.hospitals = data.data;
      console.log(this.hospitals);
    });
  }

}

