import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {HospitalService} from "../../services/hospital.service";
import {Hospital} from "../../models/hospital.model";
declare function updateMap(data, type, numUniSp, numZentSp, numGrundVers, numPsychKl, numRehaKl, numSpezKl): any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private hospitalService: HospitalService) {

  }

  private hospitalsList: Hospital[];
  private numUniSp: number = 0;
  private numZentSp: number = 0;
  private numGrundVers: number = 0;
  private numPsychKl: number = 0;
  private numRehaKl: number = 0;
  private numSpezKl: number = 0;

  ngOnInit() {
    // load all hospital data from backend

    // this.hospitalService.getAll()
    //   .subscribe(hospitals => {
    //     // this.hospitalsList = hospitals;
    //     // console.log("---------------------------------")
    //     // console.log(this.hospitalsList[2].attributes[1].value);
    //     // console.log("---------------------------------")
    //     //mapDrawer(this.hospitalsList);
    //   });
  }

  // is called when checkbox-check is changed
  // TODO: make separate function for each call in navbar.component.html (or better version with num)
  selectHospitalType(hospitalType){

    if (hospitalType == 'K111') {
      this.numUniSp = this.numUniSp+1;
      // console.log(this.numUniSp);
      // console.log(hospitalType);

      this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        //console.log(this.hospitalsList[0].attributes);
        //defineMap();
        updateMap(this.hospitalsList, hospitalType, this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
        })
      }

    if (hospitalType == 'K112') {
      this.numZentSp = this.numZentSp+1;
      // console.log(this.numZentSp);
      // console.log(hospitalType);

      this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        //console.log(this.hospitalsList[0].attributes);
        //defineMap();
        updateMap(this.hospitalsList, hospitalType, this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
        })
    }

    if (hospitalType == 'K121' || hospitalType == 'K122' || hospitalType == 'K123') {
      this.numGrundVers = this.numGrundVers+1;
      // console.log(this.numGrundVers);
      // console.log(hospitalType);

      this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        //console.log(this.hospitalsList[0].attributes);
        //defineMap();
        updateMap(this.hospitalsList, hospitalType, this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
        })
    }

    if (hospitalType == 'K211' || hospitalType == 'K212') {
      this.numPsychKl = this.numPsychKl+1;
      // console.log(this.numPsychKl);
      // console.log(hospitalType);

      this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        //console.log(this.hospitalsList[0].attributes);
        //defineMap();
        updateMap(this.hospitalsList, hospitalType, this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
        })
    }

    if (hospitalType == 'K221') {
      this.numRehaKl = this.numRehaKl+1;
      // console.log(this.numRehaKl);
      // console.log(hospitalType);

      this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        //console.log(this.hospitalsList[0].attributes);
        //defineMap();
        updateMap(this.hospitalsList, hospitalType, this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
        })
    }

    if (hospitalType == 'K231' || hospitalType == 'K232' || hospitalType == 'K233'
    || hospitalType == 'K234' || hospitalType == 'K235') {
      this.numSpezKl = this.numSpezKl+1;
      // console.log(this.numSpezKl);
      // console.log(hospitalType);

      this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.hospitalsList = hospitals;
        //console.log(this.hospitalsList[0].attributes);
        //defineMap();
        updateMap(this.hospitalsList, hospitalType, this.numUniSp, this.numZentSp, this.numGrundVers, this.numPsychKl, this.numRehaKl, this.numSpezKl);
        })
    }
  }
}
