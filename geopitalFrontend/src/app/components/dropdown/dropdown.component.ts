import { AfterViewChecked, Component, OnInit } from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {Hospital} from "../../models/hospital.model";
import {Attributes} from "../../models/attributes.model";


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  private hospitalsList: Hospital[];
  private attributeName : Attributes[];
  private attributes: any[] = [];


  constructor(private hospitalService: HospitalService) {  }

  ngOnInit() {
    this.hospitalService.getAttributes()
      .subscribe(attributes => {
        this.attributeName = attributes;

        for(let i in this.attributeName){
          var attr = this.attributeName[i].nameDE;
          this.attributes.push(attr);
        }

      });


  }

  selectedAttribute(){
    console.log("selected an attribute");
  }


}
