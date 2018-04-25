import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {Hospital} from "../../models/hospital.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private hospitalService: HospitalService) {

  }

  private hospitalsList: Hospital[];

  ngOnInit() {

    // load all hospital data from backend

    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        console.log(this.hospitalsList[2].attributes[1].value);
        //mapDrawer(this.hospitalsList);
      });
  }

  selectHospitalType(input){


  }

}
