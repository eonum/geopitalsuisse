import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {Attributes} from "../../models/attributes.model";
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
        //console.log(this.hospitalsList[0].attributes);
        //mapDrawer(this.hospitalsList);
      });
  }

}
