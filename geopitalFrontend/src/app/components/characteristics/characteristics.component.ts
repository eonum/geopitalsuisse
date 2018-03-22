import { Component, OnInit } from '@angular/core';
import { CharacteristicsService } from '../../services/characteristics.service';
import { HospitalService } from '../../services/hospital.service';
import { Characteristics } from '../../models/characteristics.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit {

  constructor(
    private characteristicService: CharacteristicsService,
    private hospitalService: HospitalService
  ) { }


  public newHospitalCharacteristic: Characteristics = new Characteristics();
  characteristicsList: Hospital[];

  ngOnInit() {

    this.hospitalService.getDummyData()
    .subscribe(characteristics => {
      //assign the todolist property to the proper http response
      this.characteristicsList = characteristics
      console.log(this.characteristicsList)
    })
  }


showHp(): void {
console.log(this.characteristicsList);
}

}
