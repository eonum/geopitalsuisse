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
  //temporary data with hospital 5 (Inselspital) for dummy-steckbrief
  private hospital5: any = [];
  private addressHospital5: any = [];
  private charHospital5: any = [];

  constructor(private hospitalService: HospitalService) {

  }

  ngOnInit() {

    // store all hospitals in hospitalsList
    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;

        // temp variable for dummy steckbrief with hospital 5 (Inselspital)
        this.hospital5 = this.hospitalsList[5];
        // temp variable for dummy steckbrief with hospital 5 (Inselspital)
        this.addressHospital5 = this.hospitalsList[5].streetAndNumber;
        // store all attribute-names (de) and values from hospitalList[5] in array
        this.charHospital5 = this.hospitalsList[5].hospital_attributes;

        // store coordinates of hospitals in array (maybe used for click-event?)
        for(let i in this.hospitalsList){
            var coor = [{latitude: this.hospitalsList[i].latitude, longitude: this.hospitalsList[i].longitude}] ;
            this.coordinates.push(coor);
        }
        // console.log("hospitals in charComponent")
        // console.log(this.hospitalsList)
        // console.log("coordinates in charComponent")
        // console.log(this.coordinates)
      });
  }


}
