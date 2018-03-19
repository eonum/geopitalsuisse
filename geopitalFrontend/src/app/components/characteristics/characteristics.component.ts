import { Component, OnInit } from '@angular/core';
import { CharacteristicsService } from '../../services/characteristics.service';
import Characteristics from '../../models/characteristics.model';
import { Hospital } from '../../Interfaces/hospital.type';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit {

  constructor(
    private characteristicService: CharacteristicsService
  ) { }


  public newHospitalCharacteristic: Characteristics = new Characteristics();
  characteristicsList: Hospital[];

  ngOnInit() {

    this.characteristicService.getDummyData()
    .subscribe(characteristics => {
      //assign the todolist property to the proper http response
      this.characteristicsList = characteristics
      console.log(characteristics)
    })
  }

}
