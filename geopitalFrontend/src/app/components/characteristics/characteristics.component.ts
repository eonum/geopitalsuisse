import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../models/hospital.model';
declare function showCharacteristics();


@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit {

  characteristicsList: Hospital[];
  private hospitalsList: Hospital[];
  private attributes: any[] = [];
  private coordinates: any[] = [];
  private charHospital5: any = [];
  private hospital5: any = [];

  constructor(private hospitalService: HospitalService) {

  }
 
  ngOnInit() {

    // store all hospitals in hospitalsList
    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;

        // temp variable for dummy list of hospital 5 (Inselspital)
        this.hospital5 = this.hospitalsList[5];
        // store all attribute-names (de) and values from hospitalList[5] in array
        this.charHospital5 = this.hospitalsList[5].attributes;
        
        // store coordinates of hospitals in array (maybe used for click-event?)
        for(let i in this.hospitalsList){
            var coor = this.hospitalsList[i].coordinates;
            this.coordinates.push(coor);
        }
        // console.log("hospitals in charComponent")
        // console.log(this.hospitalsList)
        // console.log("coordinates in charComponent")
        // console.log(this.coordinates)
      });
  }

  
}
