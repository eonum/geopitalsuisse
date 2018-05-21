import { Component, OnInit } from '@angular/core';
declare function selectedCatValue(value): any;
declare function hideAllOptions(categories): any;

@Component({
  selector: 'app-categorial-attributes',
  templateUrl: './categorial-attributes.component.html',
  styleUrls: ['./categorial-attributes.component.css']
})
export class CategorialAttributesComponent implements OnInit {

  private CatCodeList = ["RForm", "Akt", "SL", "WB", "SA", "LA"];

  constructor() { }

  ngOnInit() {
    for (var i =0 ; i<this.CatCodeList.length; i++) {
      hideAllOptions(this.CatCodeList[i]);
    }
  }

  selectedCatValue(value) {
    console.log("value")
    console.log(value)
  }

}
