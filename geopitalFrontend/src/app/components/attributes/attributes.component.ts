import { Component, OnInit } from '@angular/core';
import { Attributes } from '../../models/attributes.model';
import { HospitalService } from '../../services/hospital.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

  attributes: any[] = [];
  public attributesList: Attributes[] = [];

  constructor(
    private hospitalService: HospitalService)
    { }

  ngOnInit() {
  }

}
