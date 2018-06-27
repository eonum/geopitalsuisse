import { Component, OnInit } from '@angular/core';

import { D3Service } from '../../services/d3.service';


/**
 * Loads data from backend with hospitalService and calls function for the further use of data.
 */

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

  changeToView = 'Scatterplot';

  constructor ( private d3: D3Service ) {}

  /**
   * Loads all hospital data from backend with the help of hospitalService
   * and gives it to the mapDrawer() function in mapInitializer.js
   */
  ngOnInit() {
    this.d3.initializeMap();
  }
}
