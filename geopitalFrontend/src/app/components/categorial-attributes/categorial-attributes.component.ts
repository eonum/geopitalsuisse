import { Component, OnInit } from '@angular/core';

import { D3Service } from '../../services/d3.service';

@Component({
  selector: 'app-categorial-attributes',
  templateUrl: './categorial-attributes.component.html',
  styleUrls: ['./categorial-attributes.component.css']
})
export class CategorialAttributesComponent implements OnInit {

  private defaultCategory = {code: 'RForm', nameDE: 'Rechtsform', nameFR: 'Forme juridique', nameIT: 'Forma giuridica'};

  dict = {
    'RForm': [
      ['R1', 'AG / GmbH'],
      ['R2', 'Verein / Stiftung'],
      ['R3', 'Einzelfirma / Gesellschaft'],
      ['R4', 'Öffentliches Unternehmen']],
    'Akt': [
      ['A', 'Akutbehandlung'],
      ['B', 'Geburtshaus'],
      ['P', 'Psychiatrie'],
      ['R', 'Rehabilitation / Geriatrie']
    ],
    'SL': [
      ['IPS', 'Intensivpflegestation'],
      ['NF', 'Notfallaufnahme']
    ],
    'WB': [
      ['Arzt', 'Ärzte'],
      ['BGs', 'Gesundheitssektor'],
      ['MSt', 'Medizinstudenten']
    ],
    'SA': [
      ['Angio', 'Angiographie'],
      ['CC', 'Gamma Camera inkl. Szintigraphie und SPECT-Scanner'],
      ['CT', 'Computertomograph'],
      ['Dia', 'Dialyse'],
      ['LB', 'Linearbeschleuniger'],
      ['Lito', 'Lithotriptor'],
      ['MRI', 'Magnetresonanztomograph'],
      ['PET', 'Positronen-Emissions-Tomograph'],
    ],
    'LA': [
      ['Stat', 'Stationär'],
      ['Amb', 'Ambulant']
    ]
  };

  currentAttribute;

  constructor(
    private d3: D3Service
  ) { }

  ngOnInit() {
    this.currentAttribute = this.defaultCategory;
    this.d3.currentCategoricalAttribute$.subscribe(attribute => {
      this.currentAttribute = attribute;
    });
  }

  selectedCatValue(category, code) {
    this.d3.updateSelectedCategoryOption(category, code);
  }
}
