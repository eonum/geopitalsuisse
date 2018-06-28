import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  category1 = 'categoricalAttributes';
  category1Name = 'Filter';

  category2 = 'numericalAttributes';
  category2Name = 'Kennzahlen';

  element = 'map';

  constructor() { }

  ngOnInit() {
  }
}
