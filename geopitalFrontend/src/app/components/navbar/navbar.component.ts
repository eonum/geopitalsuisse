import { Component, OnInit } from '@angular/core';

// The declare function call is to get the D3 logic from the mapinizializer.js file
declare function updateMap(numUniSp, numZentSp, numGrundVers, numPsychKl, numRehaKl, numSpezKl): any;

/**
 * Handles checkbox-events implemented in the html-file of this component.
 * User can select or deselect a checkbox that contain the types of hospitals.
 * Hospitals of a certain type must only be displayed when the according checkbox is selected.
 */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private numUniSp = 0;
  private numZentSp = 0;
  private numGrundVers = 0;
  private numPsychKl = 0;
  private numRehaKl = 0;
  private numSpezKl = 0;


  constructor() {

  }

  ngOnInit() {

  }


  /**
   * Is called when a click-event occurs in checkbox (html of component).
   * Defines hospital type which the user has selected or deselected.
   * The number tells us whether the user has selected (even number) or deselected (uneven number) a type.
   * Hospitals of a certain type must only be displayed when the according checkbox is selected.
   * Function then calls updateMap() from mapInitializer.js in which the remaining logic is implemented.
   * @param hospitalType hospitals from this type need to be displayed (if they are hidden) or hidden (if they are displayed)
   */
  selectHospitalType(hospitalType) {

    if (hospitalType === 'uniSp') {
      this.numUniSp = this.numUniSp + 1;
      updateMap(this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
      }

    if (hospitalType === 'zentSp') {
      this.numZentSp = this.numZentSp + 1;
      updateMap(this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
    }

    if (hospitalType === 'grundVers') {
      this.numGrundVers = this.numGrundVers + 1;
      updateMap(this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
    }

    if (hospitalType === 'psychKl') {
      this.numPsychKl = this.numPsychKl + 1;
      updateMap(this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
    }

    if (hospitalType === 'rehaKl') {
      this.numRehaKl = this.numRehaKl + 1;
      updateMap(this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
    }

    if (hospitalType === 'spezKl') {
      this.numSpezKl = this.numSpezKl + 1;
      updateMap(this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
    }
  }

}
