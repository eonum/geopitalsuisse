import { Component, Input, OnInit } from '@angular/core';

import { D3Service } from '../../services/d3.service';
import { Attribute } from "../../models/attribute.model";

@Component({
  selector: 'app-categorial-attributes',
  templateUrl: './categorial-attributes.component.html',
  styleUrls: ['./categorial-attributes.component.css']
})
export class CategorialAttributesComponent implements OnInit {

  @Input() attribute: Attribute;

  constructor(
    private d3: D3Service
  ) { }

  ngOnInit() {
    this.d3.categoricalAttribute$.subscribe((attribute: Attribute) => {
      this.attribute = attribute;
    });
  }

  select(attribute: Attribute, value: string) {
    this.d3.updateSelectedCategoryOption(attribute, value);
  }
}
