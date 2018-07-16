import { Component, OnInit } from '@angular/core';

import { CharacteristicsService } from '../../services/characteristics.service';
import { Attribute } from "../../models/attribute.model";
import { D3Service } from "../../services/d3.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  name1: string = 'Filter';
  selectedCategoricalAttribute: Attribute = null;
  categoricalAttributes: Array<Attribute> = null;

  name2: string = 'Kennzahlen';
  selectedNumericalAttribute: Attribute = null;
  numericalAttributes: Array<Attribute> = null;

  constructor(
    private characteristicsService: CharacteristicsService,
    private d3: D3Service
  ) { }

  async ngOnInit () {
    this.categoricalAttributes = await this.characteristicsService.getStringAttributes().toPromise();
    this.numericalAttributes = await this.characteristicsService.getNumberAttributes().toPromise();

    this.selectedCategoricalAttribute = this.d3.getSelectedCategoricalAttribute();
    this.selectedNumericalAttribute = this.d3.getSelectedNumericalAttribute();
  }
}
