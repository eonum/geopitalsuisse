import { Component, OnInit } from '@angular/core';
declare function selectedCatValue(value): any;
declare function hideAllOptions(categories): any;
declare function updateCirclesFromSelection(allDict): any;

@Component({
  selector: 'app-categorial-attributes',
  templateUrl: './categorial-attributes.component.html',
  styleUrls: ['./categorial-attributes.component.css']
})
export class CategorialAttributesComponent implements OnInit {

  private CatCodeList = ["RForm", "Akt", "SL", "WB", "SA", "LA"];
  
  RformDict = {'R1':true, 'R2':true, 'R3':true, 'R4':true};
  AktDict = {'A':true, 'B':true, 'P':true, 'R':true};
  SLDict = {'IPS':true, 'NF':true};
  WBDict = {'Arzt':true, 'BGs':true, 'MSt':true};
  SADict = {'Angio':true, 'CC':true, 'CT':true, 'Dia':true,
              'LB':true, 'Lito':true, 'MRI':true, 'PET':true};
  LADict = {'Stat':true, 'Amb':true};              

  allDict = {'RForm':this.RformDict,
              'Akt': this.AktDict,
              'SL': this.SLDict,
              'WB': this.WBDict,
              'SA': this.SADict,
              'LA':this.LADict};


  constructor() { }

  ngOnInit() {
    for (var i =0 ; i<this.CatCodeList.length; i++) {
      hideAllOptions(this.CatCodeList[i]);
    }
  }

  selectedCatValue(category, code) {

   console.log("changing filter in category:" + category);
   console.log("code: " + code)
   console.log("set to: " + this.allDict[category][code]);
  // invert boolean decoding
  this.allDict[category][code] = !this.allDict[category][code]
  console.log("set to: " + this.allDict[category][code]);

  updateCirclesFromSelection(this.allDict);
  }

}
