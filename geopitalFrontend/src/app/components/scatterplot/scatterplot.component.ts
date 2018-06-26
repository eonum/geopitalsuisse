import { Component, OnInit } from '@angular/core';

import { Hospital } from '../../models/hospital.model';
import { CharacteristicsService } from '../../services/characteristics.service';
import { HospitalService } from '../../services/hospital.service';

declare const drawGraph;

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit {

  public numericalAttributes: any[] = [];
  private hospitalsList: Hospital[];

  changeToView = 'Map';
  xCoordinateNumAttribute = 'Attribut x-Achse';
  yCoordinateNumAttribute = 'Attribut y-Achse';

  constructor(
    private characteristicsService: CharacteristicsService,
    private hospitalService: HospitalService
  ) { }


  private static handleDropdownHighlight(attribute: any, id: string, axis: string): void {
    const div = document.getElementById(id);
    const a = div.getElementsByTagName('a');

    for (let  i = 0; i < a.length; i++) {
      if (a[i].classList.contains('active')) {
        a[i].classList.remove('active');
      }
    }
    document.getElementById(axis + '-' + attribute).classList.add('active');
  }

  ngOnInit() {
    this.characteristicsService.getNumericalAttributes()
      .subscribe(x => {
        this.numericalAttributes = x;

        this.hospitalService.getAll()
          .subscribe(hospitals => {
            this.hospitalsList = hospitals;
            drawGraph(this.hospitalsList, this.numericalAttributes);
          });
      });
  }

  filterNumAttr(axis: string): void {
    const input = (axis === 'x') ? (<HTMLInputElement>document.getElementById('searchXNumAttr')) :
      (<HTMLInputElement>document.getElementById('searchYNumAttr'));
    const filter = input.value.toUpperCase();
    const div = (axis === 'x') ? document.getElementById('xAxisNumAttr') : document.getElementById('yAxisNumAttr');
    const a = div.getElementsByTagName('a');

    for (let i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = '';
      } else {
        a[i].style.display = 'none';
      }
    }
  }

  /**
   * Function is called when user selects an attribute in the dropdown1 from the html.
   * @param xAxisNumAttr selected categorical attribute from dropdown1
   */
  selectXNumAttribute(xAxisNumAttr): void {
    ScatterplotComponent.handleDropdownHighlight(xAxisNumAttr.nameDE, 'xAxisNumAttr', 'x');
    this.xCoordinateNumAttribute = xAxisNumAttr.nameDE;
  }

  /**
   * Function is called when user selects an attribute in the dropdown2 from the html.
   * @param yAxisNumAttr selected numerical attribute from dropdown2
   */
  selectYNumAttribute(yAxisNumAttr): void {
    ScatterplotComponent.handleDropdownHighlight(yAxisNumAttr.nameDE, 'yAxisNumAttr', 'y');
    this.yCoordinateNumAttribute = yAxisNumAttr.nameDE;
  }
}
