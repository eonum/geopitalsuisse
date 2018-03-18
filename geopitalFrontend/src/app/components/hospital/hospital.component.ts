import { Component, OnInit } from '@angular/core';
import { HospitalService} from "../../services/hospital.service";
import Hospital from "../../models/hospital.model";

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  hospital: Hospital;

  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit() {
/*/!*    this.hospitalService.getDummyData().subscribe(
      (hos) => {
        this.hospital = hos[0];*!/
      }
    )*/
  }

}

