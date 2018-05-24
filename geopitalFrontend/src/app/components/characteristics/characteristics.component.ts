import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';



@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit {



  constructor(private hospitalService: HospitalService) {

  }
 
  ngOnInit() {

  }

  
}
