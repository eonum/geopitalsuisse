import { Component, OnInit } from '@angular/core';
import {Hospital} from "../../Interfaces/hospital.type";
import {HospitalService} from "../../services/hospital.service";

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  hospital: Hospital[] = [];

  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.hospitalService.getDummyData().subscribe((data) => {
      this.hospital = data;
      debugger;
      console.log(data);
    });
  }

}

