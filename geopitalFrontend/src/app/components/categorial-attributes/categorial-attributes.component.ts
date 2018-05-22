import { Component, OnInit } from '@angular/core';
declare function selectedCatValue(value): any;
declare function updateCatOptions(defaultCategory): any;
declare function updateCirclesFromSelection(allDict): any;

@Component({
  selector: 'app-categorial-attributes',
  templateUrl: './categorial-attributes.component.html',
  styleUrls: ['./categorial-attributes.component.css']
})
export class CategorialAttributesComponent implements OnInit {
  // all categorical codes
  private CatCodeList = ["RForm", "Akt", "SL", "WB", "SA", "LA"];
  // default category to show on loaded site
  private DefaultCategory = {code:"RForm", nameDE:"Rechtsform", nameFR: "Forme juridique", nameIT: "Forma giuridica"}
  
  // dictionaries with all options of the categorical codes,
  // when an option is true it's selected, when false it's deselected
  RformDict = {'R1':true, 'R2':true, 'R3':true, 'R4':true};
  AktDict = {'A':true, 'B':true, 'P':true, 'R':true};
  SLDict = {'IPS':true, 'NF':true};
  WBDict = {'Arzt':true, 'BGs':true, 'MSt':true};
  SADict = {'Angio':true, 'CC':true, 'CT':true, 'Dia':true,
              'LB':true, 'Lito':true, 'MRI':true, 'PET':true};
  LADict = {'Stat':true, 'Amb':true};              

  allDict = {'RForm':this.RformDict,
              'Akt':this.AktDict,
              'SL':this.SLDict,
              'WB':this.WBDict,
              'SA':this.SADict,
              'LA':this.LADict};

  constructor() { }

  ngOnInit() {    
    // displays default category (RForm) on loaded site
    updateCatOptions(this.DefaultCategory);
  }

  // updates the selected/deselected options and give the information to mapInitializer
  selectedCatValue(category, code) {
  // inverts boolean of selected / deselected option
  this.allDict[category][code] = !this.allDict[category][code]
  updateCirclesFromSelection(this.allDict);
  }

}
