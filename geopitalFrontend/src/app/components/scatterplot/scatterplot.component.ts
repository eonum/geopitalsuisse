import { Component, OnInit } from '@angular/core';

import { Attribute } from "../../models/attribute.model";
import { D3Service } from '../../services/d3.service';
import { CharacteristicsService } from "../../services/characteristics.service";


@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit {

  name_x_axis = 'Kennzahl x-Achse';
  x_axis = 'x';
  xCoordinateAttribute: Attribute = null;

  name_y_axis = 'Kennzahl y-Achse';
  y_axis = 'y';
  yCoordinateAttribute: Attribute = null;

  attributes: Array<Attribute> = null;

  constructor(
    private d3: D3Service,
    private characteristicsService: CharacteristicsService
  ) { }

  ngOnInit() {
    this.d3.drawGraph();

    this.characteristicsService.getNumberAttributes().subscribe((attributes: Array<Attribute>) => {
      this.attributes = attributes;
    });

    this.xCoordinateAttribute = this.d3.getXCoordinateAttribute();
    this.yCoordinateAttribute = this.d3.getYCoordinateAttribute();
  }
}
