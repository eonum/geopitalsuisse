import {AfterViewChecked, Component, OnInit, Attribute} from '@angular/core';
declare function mapDrawer(hospitals, attributes): any;
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
    this.attributesList = [new Attributes()];
  }

  public newHospital: Hospital = new Hospital();
  public newAttributes: Attributes = new Attributes();
  hospitalsList: Hospital[];
  attributesList: Attributes[];
  singleAttribute: Attributes;


  ngOnInit() {

   // load hospital data from backend
    //this.hospitalService.getDummyData()
    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        
        // load all attribute objects from all hospitals
        for (var i = 0; i < this.hospitalsList.length; i++){
          this.hospitalService.getAttributes(this.hospitalsList[i]._id)
          .subscribe(attributes => {
            this.singleAttribute = attributes;
            var tempAttribute = new Attributes;
            tempAttribute = attributes;
            this.attributesList.push(tempAttribute);
          })
        }
        // draw map with arguments from service
        mapDrawer(this.hospitalsList, this.attributesList);
      });    
  }

  // everything in here is getting triggered every time the map is touched (click/hover)
  ngAfterViewChecked() {
    //console.log("am I getting triggered");
    
    //this.hospitalService.getDummyData().subscribe(hospitals => {
    //     mapDrawer(hospitals);
    //  }
    //)
  }

}
