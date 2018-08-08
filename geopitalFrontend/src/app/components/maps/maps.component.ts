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

  constructor (
    private d3: D3Service
  ) {}

  ngOnInit() {
    this.d3.drawMap();
  }
}
