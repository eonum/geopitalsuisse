import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {Hospital} from "../../models/hospital.model";
declare function updateMap(data, type, num): any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private hospitalService: HospitalService) {

  }

  private hospitalsList: Hospital[];
  private num: number = 0;

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
  // TODO: make separate function for each call in navbar.component.html (or better version with num)
  selectHospitalType(hospitalType){

    this.num = this.num+1;
    console.log(this.num);
    console.log(hospitalType);

    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        console.log(this.hospitalsList[0].attributes);
        //defineMap();
        updateMap(this.hospitalsList, hospitalType, this.num);
      });
  }
}
