import { Component, OnInit } from '@angular/core';

import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  name1 = 'Filter';
  selectedCatAttribute;
  categoricalAttributes;

  name2 = 'Kennzahlen';
  selectedNumAttribute;
  numericalAttributes;

  constructor(
    private characteristicsService: CharacteristicsService,
  ) { }

  ngOnInit() {
    this.characteristicsService.getCategoricalAttributes().subscribe(attributes => {
      this.categoricalAttributes = attributes;

      // extract the categorical attribute 'Typ' since its not used in this selection
      this.categoricalAttributes = this.categoricalAttributes.filter(attribute => attribute.code !== 'Typ');
    });

    this.characteristicsService.getNumericalAttributes().subscribe(attributes => {
      this.numericalAttributes = attributes;
    });

    this.selectedCatAttribute = D3Service.getDefaultCategoricalAttribute();
    this.selectedNumAttribute = D3Service.getDefaultNumericalAttribute();
  }
}
