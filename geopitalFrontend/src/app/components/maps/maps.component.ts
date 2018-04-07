import {AfterViewChecked, Component, OnInit} from '@angular/core';
declare function mapDrawer(data): any;
import { HospitalService } from '../../services/hospital.service';
import {Hospital} from "../../models/hospital.model";


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit, AfterViewChecked {
  
  constructor(private hospitalService: HospitalService) {
  }

  hospitals: any[] = [];
  public hospitalList: Hospital[] = [];

  ngOnInit() {
    // load hospital data from backend
    this.hospitalService.getDummyData()
     // this.hospitalService.getAll()
     // TODO: getAll() does not work yet!
      .subscribe(hospitals => {
        this.hospitalList = hospitals;
        // draw map with arguments from service
        mapDrawer(this.hospitalList);
        console.log("data from component")
        for (var i = 0; i<this.hospitalList.length; i++)
        console.log(this.hospitalList[i]);
      });

    
  }

  // everything in here is getting triggered every time the map is touched or hoverd over
  ngAfterViewChecked() {
    //console.log("am I getting triggered");
    
    //this.hospitalService.getDummyData().subscribe(hospitals => {
    //     mapDrawer(hospitals);
    //  }
    //)
  }

}
