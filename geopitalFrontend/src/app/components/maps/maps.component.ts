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
/*   lat: number = 46.818188;
  lng: number = 8.227512;
  lat1: number = 46.9490830802915;
  lng1: number = 7.426111180291502;
  lat2: number = 47.3781037802915;
  lng2: number = 8.552398080291503; */

  hospitals: any[] = [];
  public hospitalList: Hospital[] = [];


  constructor(private hospitalService: HospitalService) {
  }

  ngOnInit() {
    // load hospital data from backend
    this.hospitalService.getDummyData()
      .subscribe(hospitals => {
        this.hospitalList = hospitals;
        for (var i = 0; i<this.hospitalList.length; i++)
        console.log(this.hospitalList[i]);
      });

    // draw map 
    mapDrawer(this.hospitalList);
    console.log("map loaded");
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
