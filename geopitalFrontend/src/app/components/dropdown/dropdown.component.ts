import { AfterViewChecked, Component, OnInit } from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {Hospital} from "../../models/hospital.model";


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  private hospitalsList: Hospital[];
  private attributes: any[] = [];


  constructor(private hospitalService: HospitalService) {  }

  ngOnInit() {
    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;

        // store name of attributes (de, it, fr) in array to display in dropdown
        // TODO: scroll in array
        for(let i in this.hospitalsList){
          for(let j in this.hospitalsList[i].attributes){
            var attr = this.hospitalsList[i].attributes[j].name;
            this.attributes.push(attr);
          }
        }
      });


  }


}
