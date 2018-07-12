import { Component, OnInit } from '@angular/core';

import { CharacteristicsService } from '../../services/characteristics.service';
import { Attribute } from "../../models/attribute.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  name1: string = 'Filter';
  selectedCatAttribute: Attribute = null;
  categoricalAttributes: Array<Attribute> = null;

  name2: string = 'Kennzahlen';
  selectedNumAttribute: Attribute = null;
  numericalAttributes: Array<Attribute> = null;

  constructor(
    private characteristicsService: CharacteristicsService,
  ) { }

  ngOnInit() {
    this.characteristicsService.getStringAttributes().subscribe((attributes: Array<Attribute>) => {
      this.categoricalAttributes = attributes;
    });

    this.characteristicsService.getNumberAttributes().subscribe((attributes: Array<Attribute>) => {
      this.numericalAttributes = attributes;
    });

    this.characteristicsService.getDefaultStringAttribute().subscribe((attribute: Attribute) => {
      this.selectedCatAttribute = attribute
    });

    this.characteristicsService.getDefaultNumberAttribute().subscribe((attribute: Attribute) => {
      this.selectedNumAttribute = attribute
    });
  }
}
