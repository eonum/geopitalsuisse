import {AfterViewChecked, Component, OnInit} from '@angular/core';
declare function mapDrawer(data): any;
import { HospitalService } from '../../services/hospital.service';
import {Hospital} from "../../models/hospital.model";
import { Characteristics } from '../../models/characteristics.model';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit, AfterViewChecked {
  
  constructor(private hospitalService: HospitalService) {
  }

  hospitals: any[] = [];
  characteristics: any[] = [];
  public hospitalList: Hospital[] = [];
  public characteristicsList: Characteristics[] = [];

  ngOnInit() {

    // this.hospitalService.getAttributes("5ac8d24f6af3b31a03bac028").
    // subscribe(characteristics => {
    //   console.log(characteristics)
    // });

    // load hospital data from backend
    //this.hospitalService.getDummyData()
    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalList = hospitals;
        console.log(this.hospitalList);


       /*  for (var i=0; i<this.hospitalList.length; i++){
          this.hospitalService.getAttributes(this.hospitalList[i]._id)
          .subscribe(characteristics => {
            this.characteristicsList = characteristics;
            console.log(this.characteristicsList);

          }); */
        //}
        //console.log(this.characteristicsList);
        console.log(this.hospitalList);
        //console.log("data from component")
        //for (var i = 0; i<this.hospitalList.length; i++)
        //  console.log(this.hospitalList);
        // draw map with arguments from service
        mapDrawer(this.hospitalList);
      
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
