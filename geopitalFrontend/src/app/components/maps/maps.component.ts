import {AfterViewChecked, Component, OnInit, Attribute} from '@angular/core';
//declare function mapDrawer(hospitals, attributes): any;
declare function mapDrawer(data): any;
declare function defineMap();
import { HospitalService } from '../../services/hospital.service';
import {Hospital} from "../../models/hospital.model";
import { Characteristics } from '../../models/characteristics.model';
import { Attributes } from '../../models/attributes.model';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit, AfterViewChecked {

  constructor(private hospitalService: HospitalService) {

  }

  private hospitalsList: Hospital[];


  ngOnInit() {

   // load all hospital data from backend

    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        //console.log(this.hospitalsList[0].attributes);
        //defineMap();
        mapDrawer(this.hospitalsList);
      });
  }

  // everything in here is getting triggered every time the map is touched (click/hover)
  ngAfterViewChecked() {

  }

}
