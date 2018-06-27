import { Component, OnInit } from '@angular/core';
import { D3Service } from '../../services/d3.service';

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

  constructor(
    private d3: D3Service
  ) { }

  ngOnInit() {
    // option panel must be wiped first
    for (let i = 0 ; i < this.CatCodeList.length; i++) {
      this.d3.hideAllOptions(this.CatCodeList[i]);
    }

    // displays default category (RForm)
    this.d3.showOptionsForSelectedCategoricalAttribute(this.DefaultCategory);
    // sets all selections initially 'true'
    // setDefaultOptionSelection(this.allDict);
    this.d3.initializeCheckBoxDictionary(this.allDict);
  }

  // updates the selected/deselected options and give the information to mapInitializer
  selectedCatValue(category, code) {
    this.d3.updateSelectedCategoryOption(category, code);
  }
}
