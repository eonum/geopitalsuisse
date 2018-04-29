import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {Hospital} from "../../models/hospital.model";
declare function updateMap(data, type): any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private hospitalService: HospitalService) {

  }

  private hospitalsList: Hospital[];

  ngOnInit() {
    // load all hospital data from backend

    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        console.log("---------------------------------")
        console.log(this.hospitalsList[2].attributes[1].value);
        console.log("---------------------------------")
        //mapDrawer(this.hospitalsList);
      });
  }

  // is called when checkbox-check is changed
  selectHospitalType(hospitalType){
    console.log(hospitalType);

    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        console.log(this.hospitalsList[0].attributes);
        //defineMap();
        updateMap(this.hospitalsList, hospitalType);
      });
  }
}
