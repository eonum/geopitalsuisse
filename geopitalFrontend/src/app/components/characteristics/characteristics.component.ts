import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../models/hospital.model';


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
            var coor = [{latitude: this.hospitalsList[i].latitude, longitude: this.hospitalsList[i].longitude}] ;
            this.coordinates.push(coor);
            console.log(this.coordinates)
        }
      });


  }

showCharacteristics(Coordinates): void {
  console.log("function called")
}


showHp(): void {
console.log(this.characteristicsList);
}

}
