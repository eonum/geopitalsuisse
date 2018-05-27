import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';

/**
 * Component for the short information (Steckbrief) of the selected hospital.
 * The logic is implemented in mapInitializer.js.
 */

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
