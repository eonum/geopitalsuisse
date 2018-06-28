import { Component, OnInit } from '@angular/core';

import { Hospital } from '../../models/hospital.model';
import { CharacteristicsService } from '../../services/characteristics.service';
import { HospitalService } from '../../services/hospital.service';
import { D3Service } from '../../services/d3.service';


@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit {

  private hospitalsList: Hospital[];

  changeToView = 'Map';

  name1 = 'Kennzahl x-Achse';
  axis1 = 'x';
  xCoordinateNumAttribute;

  name2 = 'Kennzahl y-Achse';
  axis2 = 'y';
  yCoordinateNumAttribute;

  numericalAttributes;

  constructor(
    private characteristicsService: CharacteristicsService,
    private hospitalService: HospitalService,
    private d3: D3Service
  ) { }

  ngOnInit() {
    this.characteristicsService.getNumericalAttributes()
      .subscribe(x => {
        this.numericalAttributes = x;

        this.hospitalService.getAll()
          .subscribe(hospitals => {
            this.hospitalsList = hospitals;
            this.d3.drawGraph(this.hospitalsList, this.numericalAttributes);
          });
      });

    this.xCoordinateNumAttribute = D3Service.getDefaultXAxisAttribute();
    this.yCoordinateNumAttribute = D3Service.getDefaultYAxisAttribute();
  }
}
