import { Component, OnInit } from '@angular/core';

// The declare function call is to get the D3 logic from the mapinizializer.js file
declare function selectedCatValue(value): any;
declare function hideAllOptions(categories): any;
declare function updateCatOptions(defaultCategory): any;
declare function setDefaultOptionSelection(allDict): any;
declare function updateCirclesFromSelection(category, code): any;

@Component({
  selector: 'app-categorial-attributes',
  templateUrl: './categorial-attributes.component.html',
  styleUrls: ['./categorial-attributes.component.css']
})
export class CategorialAttributesComponent implements OnInit {
  // all categorical codes
  private CatCodeList = ['RForm', 'Akt', 'SL', 'WB', 'SA', 'LA'];
  // default category to show on loaded site
  private DefaultCategory = {code: 'RForm', nameDE: 'Rechtsform', nameFR: 'Forme juridique', nameIT: 'Forma giuridica'};

  // dictionaries with all options of the categorical codes,
  // when an option is true it's selected, when false it's deselected
  RformDict = {'R1': false, 'R2': false, 'R3': false, 'R4': false};
  AktDict   = {'A': false, 'B': false, 'P': false, 'R': false};
  SLDict    = {'IPS': false, 'NF': false};
  WBDict    = {'Arzt': false, 'BGs': false, 'MSt': false};
  SADict    = {'Angio': false, 'CC': false, 'CT': false, 'Dia': false, 'LB': false, 'Lito': false, 'MRI': false, 'PET': false};
  LADict    = {'Stat': false, 'Amb': false};

  allDict   = {'RForm': this.RformDict,
              'Akt': this.AktDict,
              'SL': this.SLDict,
              'WB': this.WBDict,
              'SA': this.SADict,
              'LA': this.LADict};

  constructor() { }

  ngOnInit() {
    // option panel must be wiped first
    for (let i = 0 ; i < this.CatCodeList.length; i++) {
      hideAllOptions(this.CatCodeList[i]);
    }

    // displays default category (RForm)
    updateCatOptions(this.DefaultCategory);
    // sets all selections initially 'true'
    setDefaultOptionSelection(this.allDict);
  }

  // updates the selected/deselected options and give the information to mapInitializer
  selectedCatValue(category, code) {
    updateCirclesFromSelection(category, code);
  }
}
