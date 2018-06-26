import { Component, OnInit } from '@angular/core';

import { Hospital } from '../../models/hospital.model';
import { CharacteristicsService } from '../../services/characteristics.service';
import { HospitalService } from '../../services/hospital.service';

declare const drawGraph;

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit {

  private hospitalsList: Hospital[];
  private numericalAttributes: any;
  changeToView = 'Map';

  constructor(
    private characteristicsService: CharacteristicsService,
    private hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.characteristicsService.getNumericalAttributes()
      .subscribe(x => {
        this.numericalAttributes = x;

        this.hospitalService.getAll()
          .subscribe(hospitals => {
            this.hospitalsList = hospitals;
            drawGraph(this.hospitalsList, this.numericalAttributes);
          });
      });
  }

}
