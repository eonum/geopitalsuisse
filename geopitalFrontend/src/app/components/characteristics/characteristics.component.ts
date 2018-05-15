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

  constructor(private hospitalService: HospitalService) {

  }
 
  ngOnInit() {
    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;

        // store name of attributes (de, it, fr) in array to display in dropdown
        for(let i in this.hospitalsList){
            var coor = this.hospitalsList[i].coordinates;
            this.coordinates.push(coor);
        }
        console.log("hospitals in charComponent")
        console.log(this.hospitalsList)
        console.log("coordinates in charComponent")
        console.log(this.coordinates)
      });
  }

  
}
