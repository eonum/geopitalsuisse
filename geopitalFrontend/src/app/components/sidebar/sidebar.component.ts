import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';

import { Attribute } from '../../models/attribute.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  dropdownCategoricalAttributes = 'Filter';
  categoricalAttributes: Array<Attribute> = null;

  dropdownNumericalAttributes = 'Kennzahlen';
  numericalAttributes: Array<Attribute> = null;

  selectedHospital: Hospital = null;
  categoricalAttribute: Attribute = null;
  numericalAttribute: Attribute = null;

  constructor(
    private characteristicsService: CharacteristicsService,
    private d3: D3Service,
  ) { }

  ngOnInit () {
    this.d3.selectedHospital$.subscribe(hospital => {
      this.selectedHospital = hospital;
    });

    this.d3.categoricalAttribute$.subscribe((catAttribute: Attribute) => {
      this.categoricalAttribute = catAttribute;
    });

    this.d3.numericalAttribute$.subscribe((numAttribute: Attribute) => {
      this.numericalAttribute = numAttribute;
    });

    this.characteristicsService.getStringAttributes().subscribe((attributes: Array<Attribute>) => {
      this.categoricalAttributes = attributes;
    });

    this.characteristicsService.getNumberAttributes().subscribe((attributes: Array<Attribute>) => {
      this.numericalAttributes = attributes;
    });
  }
}
