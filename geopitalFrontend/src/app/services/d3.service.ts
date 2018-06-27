import { Injectable } from '@angular/core';

import * as d3 from 'd3';
import { CharacteristicsService } from './characteristics.service';
import { HospitalService } from './hospital.service';
import { Hospital } from '../models/hospital.model';

declare const L;

@Injectable()
export class D3Service {

  private svg;
  private map;
  private div;
  private tooltip;

  private allHospitals = [];
  private allNumericalAttributes = [];
  private allCategoricalAttributes = [];

  private currentNumericalAttribute;
  private currentCategoricalAttribute;

  private modifiedHospitals;
  private filteredHospitals = [];
  private selectedHospital: Hospital;

  private selectedHospitalTypes = [];

  private circles;
  private checkBoxDictionary;

  private singleClassCategories = ['RForm'];
  private multiClassCategories = ['Akt', 'SL', 'WB', 'SA', 'LA'];

  private xCoordinateNumAttribute;
  private yCoordinateNumAttribute;
  private allXCoordValues = [];
  private allYCoordValues = [];
  private sumOfXValues = 0;
  private sumOfYValues = 0;
  private graphSvg;

  /*
  private width = window.innerWidth / 3;
  private height = this.width / 1.5;
  private margin = { top: 20, right: 100, bottom: 20, left: 100 };

  private xScale = d3.scale.linear().range([0, this.width]);
  private yScale = d3.scale.linear().range([this.height, 0]);

  private xAxis = d3.svg.axis().scale(this.xScale).orient('bottom');
  private yAxis = d3.svg.axis().scale(this.yScale).orient('left');
  */

  constructor(
    private characteristicsService: CharacteristicsService,
    private hospitalService: HospitalService
  ) {
    this.characteristicsService.getNumericalAttributes()
      .subscribe(numAttributes => {
        this.allNumericalAttributes = numAttributes;
      });

    this.characteristicsService.getCategoricalAttributes()
      .subscribe(catAttributes => {
        this.allCategoricalAttributes = catAttributes;
      });

    this.hospitalService.getAll()
      .subscribe(hospitals => {
        this.allHospitals = hospitals;
        this.selectedHospital = hospitals[0];
      });
  }


  static getDefaultNumericalAttribute(): any {
    return {
      category: 'number',
      code: 'EtMedL',
      nameDE: 'Ertrag aus medizinischen Leistungen und Pflege',
      nameFR: 'Produits des hospitalisations et soins',
      nameIT: 'Ricavi per degenze e cure'};
  }

  static getDefaultCategoricalAttribute(): any {
    return {
      category: 'string',
      code: 'RForm',
      nameDE: 'Rechtsform',
      nameFR: 'Forme juridique',
      nameIT: 'Forma giuridica'
    };
  }

  private showMap() {
    console.log('document.getElementById(\'mapid\')', document.getElementById('mapid'), document.getElementById('mapid') !== null)
    return document.getElementById('mapid') !== null;
  }


  initializeMap() {
    // ------------------------------------------------------
    // Initialize map

    this.defineMap();

    // ------------------------------------------------------
    // Initialize data

    this.currentNumericalAttribute = D3Service.getDefaultNumericalAttribute();

    this.currentCategoricalAttribute = D3Service.getDefaultCategoricalAttribute();

    this.createCharacteristics(this.selectedHospital);

    this.initMapData(this.allHospitals, this.selectedHospitalTypes);

    // add SVG element to leaflet's overlay pane (group layers)
    this.addSVGelement();

    this.calculateSVGBounds(this.allHospitals);

    this.initTooltip();

    this.initCircles(this.modifiedHospitals);

    // makes points invisible when user starts zooming
    this.map.on('zoomstart', () => {
      d3.select('#circleSVG').style('visibility', 'hidden');
    });

    // makes points visible again after user has finished zooming
    this.map.on('zoomend', () => {
      const maxValue = this.getMaxValue(this.modifiedHospitals);
      this.circles
        .attr('cx', (d) => { return this.projectPoint(d.longitude, d.latitude).x; })
        .attr('cy', (d) => { return this.projectPoint(d.longitude, d.latitude).y; })
        .attr('r', (d) => { return this.getCircleRadius(d, maxValue); });

      this.calculateSVGBounds(this.allHospitals);
      d3.select('#circleSVG').style('visibility', 'visible');
    });
  }

  private addSVGelement() {
    console.log('add SVG element, showMap', this.showMap())
    if (this.showMap()) {
      this.svg = d3.select(this.map.getPanes().overlayPane).append('svg').attr('id', 'circleSVG');
    } else {

    }
  }


  /**
   * Stores data in array for displaying it. Builds up array with the important information.
   *
   * @param {Hospital[]} allHospitals
   * @param selectedHospitalTypes
   */
  private initMapData (allHospitals: any, selectedHospitalTypes: any) {
    this.modifiedHospitals = [];

    for (let i = 0; i < allHospitals.length; i++) {

      const currentHospital = allHospitals[i];

      if (currentHospital.name !== null && currentHospital.latitude !== null && currentHospital.longitude !== null) {
        const hospitalName = currentHospital.name;
        const latitude = currentHospital.latitude;
        const longitude = currentHospital.longitude;
        const attributes = currentHospital.hospital_attributes;

        let sizeAttribute;
        let typeAttribute ;

        // filters code attribute and saves it in variable
        const sizeResult = attributes.filter(obj => obj.code === this.currentNumericalAttribute.code );

        if (sizeResult == null || sizeResult[0] == null || sizeResult[0].value == null) {
          continue;
        } else {
          sizeAttribute = Number(sizeResult[0].value);
        }

        // filters type attribute and saves it in variable
        const typeResult = attributes.filter(obj => obj.code === 'Typ' );

        if (typeResult == null || typeResult[0] == null || typeResult[0].value == null) {
          typeAttribute = null;
        } else {
          typeAttribute = String(typeResult[0].value);
        }

        const basicInformation = {longitude: longitude, latitude: latitude, name: hospitalName, radius: sizeAttribute, Typ: typeAttribute};

        if (selectedHospitalTypes.length === 0) {
          this.modifiedHospitals.push(basicInformation);
        } else {
          for (let j = 0; j < selectedHospitalTypes.length; j++) {
            if (typeAttribute === selectedHospitalTypes[j]) {
              this.modifiedHospitals.push(basicInformation);
            }
          }
        }
      }
    }
  }

  /**
   * Adapt Leaflet’s API to fit D3 with custom geometric transformation.
   * Calculates x and y coordinate in pixels for given coordinates (wgs84)
   *
   * @param x
   * @param y
   * @returns {any}
   */
  private projectPoint(x, y) {
    return this.map.latLngToLayerPoint(new L.LatLng(y, x));
  }

  private initTooltip() {
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0.0);
  }

  private createCharacteristics (clickedHospital: any) {
    this.selectedHospital = clickedHospital;

    if (clickedHospital != null) {
      const clickedHospitalData = this.getAllDataForClickedHospital(clickedHospital);

      let sizeResult = clickedHospitalData.hospital_attributes.find(obj => obj.code === this.currentNumericalAttribute.code);
      let catResult = clickedHospitalData.hospital_attributes.find(obj => obj.code === this.currentCategoricalAttribute.code);

      if (sizeResult == null) {
        sizeResult = null;
      }

      if (catResult == null) {
        catResult = null;
      }

      // displays the name and address of the clicked hospital in characteristics (Steckbrief)
      document.getElementById('hospitalName').innerHTML = clickedHospital.name;
      if (clickedHospitalData.streetAndNumber !== '') {
        document.getElementById('hospitalAddress').innerHTML = clickedHospitalData.streetAndNumber + '<br/>'
          + clickedHospitalData.zipCodeAndCity;
      } else {
        document.getElementById('hospitalAddress').innerHTML = '' + clickedHospitalData.zipCodeAndCity;
      }

      // displays the values of the current numerical and categorical attribute of clicked hospital
      if (sizeResult !== null) {
        document.getElementById('numericalAttributeName').innerHTML = this.currentCategoricalAttribute.nameDE;
        document.getElementById('numericalAttributeValue').innerHTML = this.formatValues(this.currentCategoricalAttribute, sizeResult.value);
      } else {
        document.getElementById('numericalAttributeName').innerHTML = this.currentNumericalAttribute.nameDE;
        document.getElementById('numericalAttributeValue').innerHTML = 'Keine Daten';
      }

      if (catResult !== null) {
        document.getElementById('categoricalAttributeName').innerHTML = this.currentCategoricalAttribute.nameDE;
        document.getElementById('categoricalAttributeValue').innerHTML = catResult.value;
      } else {
        document.getElementById('categoricalAttributeName').innerHTML = this.currentCategoricalAttribute.nameDE;
        document.getElementById('categoricalAttributeValue').innerHTML = 'Keine Daten';
      }
    }


  }


  /**
   * Initialize circles on map for the given hospitals
   *
   * @param {Array} currentHospitals data that is visualized as circles (with x- and y-coordinates and radius r)
   */
  private initCircles (currentHospitals: Hospital[]) {
    // get maximal value of radius to calculate radius of circles
    const maxValue = this.getMaxValue(currentHospitals);

    // define circles
    this.circles = this.svg.selectAll('circle')
      .data(currentHospitals)
      .enter()
      .append('circle')
      .style('fill-opacity', 0.7)
      .attr('r', (d) => {
        return this.getCircleRadius(d, maxValue);
      })
      .attr('fill', (d) => {
        return this.getColourBasedOnType(d);
      })
      .attr('stroke', (d) => {
        return this.getColourBasedOnType(d);
      })
      .attr('cx', (d) => {
        return this.projectPoint(d.longitude, d.latitude).x;
      })
      .attr('cy', (d) => {
        return this.projectPoint(d.longitude, d.latitude).y;
      })
      .on('mouseover', (d) => {
        return this.showTooltip(d);
      })
      .on('mouseout', () => {
        return this.removeTooltip();
      })
      .on('click', (d) => {
        return this.createCharacteristics(d);
      });
  }


  /**
   * Removes circles and all attributes that has been assigned to them.
   */
  private removeCircles() {
    if (this.svg !== null && this.svg.selectAll !== null) {
      this.svg.selectAll('circle').remove();
    }
  }

  /**
   * Calculate the width and the height of the svg element.
   * calculate the y max and x max value for all datapoints and add a padding.
   * xmax is width and ymax is height of svg-layer
   *
   * @param {Hospital[]} allHospitals
   */
  private calculateSVGBounds(allHospitals: Hospital[]) {
    let xMax = 0;
    let yMax = 0;
    const heightPadding = 100;
    const widthPadding = 300;

    allHospitals.forEach((d) => {
      xMax = Math.max(this.projectPoint(d.longitude, d.latitude).x, xMax);
      yMax = Math.max(this.projectPoint(d.longitude, d.latitude).y, yMax);
    });

    this.svg
      .style('left', 0)
      .style('width', xMax + widthPadding)
      .style('top', 0)
      .style('height', yMax + heightPadding);
  }

  private defineMap () {
    this.map = L.map('mapid').setView([46.818188, 8.97512], 8);

    // basic map using OpenStreetMap tiles with custom design using mapbox
    L.tileLayer('https://api.mapbox.com/styles/v1/nathi/cjf8cggx93p3u2qrqrgwoh5nh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF0aGkiLCJhIjoiY2pmOGJ4ZXJmMXMyZDJ4bzRoYWRxbzhteCJ9.x2dbGjsVZTA9HLw6VWaQow', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(this.map);
  }

  /**
   * Updates map with new data
   *
   * For the next parameters: number of times checkbox was pressed
   * --> since default is checked, even numbers (0,2,4,6, ...) mean that this type should be displayed
   * @param numUniSp
   * @param numZentSp
   * @param numGrundVers
   * @param numPsychKl
   * @param numRehaKl
   * @param numSpezKl
   */
  updateSelectedHospitalTypes(numUniSp, numZentSp, numGrundVers, numPsychKl, numRehaKl, numSpezKl) {
    let data;

    // use only filtered hospitals (categorical attributes) but only if a filter is active
    if (this.filteredHospitals.length !== 0) {
      data = this.filteredHospitals;
    } else {
      data = this.allHospitals;
    }

    // remove circles that are already defined so we can initialize them again with other data
    this.removeCircles();

    // first empty type
    this.selectedHospitalTypes = [];

    // build up data array
    // odd numbers of clicks mean that the checkbox is checked and hospitals with that type should be drawn
    if ((numUniSp % 2) === 1) {
      this.selectedHospitalTypes.push('K111');
    }
    if ((numZentSp % 2) === 1) {
      this.selectedHospitalTypes.push('K112');
    }
    if ((numGrundVers % 2) === 1) {
      this.selectedHospitalTypes.push('K121', 'K122', 'K123');
    }
    if ((numPsychKl % 2) === 1) {
      this.selectedHospitalTypes.push('K211', 'K212');
    }
    if ((numRehaKl % 2) === 1) {
      this.selectedHospitalTypes.push('K221');
    }
    if ((numSpezKl % 2) === 1) {
      this.selectedHospitalTypes.push('K231', 'K232', 'K233', 'K234', 'K235');
    }

    if (((numUniSp % 2) === 0) && ((numZentSp % 2) === 0) && ((numGrundVers % 2) === 0) && ((numPsychKl % 2) === 0) &&
      ((numRehaKl % 2) === 0) && ((numSpezKl % 2) === 0)) {
      this.selectedHospitalTypes
        .push('K111', 'K112', 'K121', 'K122', 'K123', 'K211', 'K212', 'K221', 'K231', 'K232', 'K233', 'K234', 'K235');
    }

    this.initMapData(data, this.selectedHospitalTypes);

    this.initCircles(this.modifiedHospitals);
  }

  /**
  * Updates the current numerical attribute for characteristics (Steckbrief)
  * and initializes the change of circles' radius according to the chosen
  * numerical attribute
  * @param numericalAttribute selected numerical Attribute from Dropdown1
  */
  updateSelectedNumericalAttribute(numericalAttribute) {
    this.currentNumericalAttribute = numericalAttribute;

    this.updateMap('numericalAttribute');
  }

  updateSelectedCategoricalAttribute(categoricalAttribute: any) {
    this.currentCategoricalAttribute = categoricalAttribute;
    this.showOptionsForSelectedCategoricalAttribute(categoricalAttribute);

    this.updateMap('categoricalAttribute');
  }

  /**
   *
   * @param {string} changedAttribute
   */
  updateMap(changedAttribute: string) {
    let data;

    if (changedAttribute === 'categoricalAttribute') {
      data = this.allHospitals;
      this.filteredHospitals = [];
      this.resetCheckBoxes();

    } else if (changedAttribute === 'numericalAttribute') {
      if (this.filteredHospitals.length !== 0) {
        data = this.filteredHospitals;
      } else {
        data = this.allHospitals;
      }
    }

    this.removeCircles();
    this.initMapData(data, this.selectedHospitalTypes);
    this.initCircles(this.modifiedHospitals);
    this.createCharacteristics(this.selectedHospital);
  }

  /**
   * Gives markers different radius according to the numerical attribute
   * @param d data which is displayed as a circle
   * @param maxValue
   * @returns {number} radius of the marker (according numerical attribute)
   */
  private getCircleRadius (d: any, maxValue: any) {
    const zoomLevel = this.map.getZoom();
    if (d.radius === 0) {
      return 3 * zoomLevel * zoomLevel / 100; // circles with value 0 have radius 3
    } else {
      return ((d.radius / maxValue) * 40 + 5) * zoomLevel * zoomLevel / 100;
    }
  }

  /**
   * Returns the maximal value of the chosen numerical attribute
   * @param currentHospitals data which is displayed as a circle
   * @returns {number} maximal radius of the chosen attribute
   */
  private getMaxValue (currentHospitals: any) {
    let maxValue = 0;
    // get max value of radius attribute (to calculate radius of circles)
    for (let i = 0; i < currentHospitals.length; i++) {
      if (currentHospitals[i] !== null && currentHospitals[i].radius !== null) {
        if (currentHospitals[i].radius > maxValue) {
          maxValue = currentHospitals[i].radius;
        }
      }
    }
    return maxValue;
  }

  /**
   * Gives markers different color according to its type attribute
   * @param d data which is displayed as a circle
   * @returns {string} color of the marker (according to type)
   */
  private getColourBasedOnType(d)  {
    if (d.Typ === 'K111') {
      return ('#a82a2a');
    } else if (d.Typ === 'K112') {
      return ('#a89f2a');
    } else if (d.Typ === 'K121' || d.Typ === 'K122' || d.Typ === 'K123') {
      return ('#2ca82a');
    } else if (d.Typ === 'K211' || d.Typ === 'K212') {
      return ('#2a8ea8');
    } else if (d.Typ === 'K221') {
      return ('#2c2aa8');
    } else if (d.Typ === 'K231' || d.Typ === 'K232' || d.Typ === 'K233' || d.Typ === 'K234' || d.Typ === 'K235') {
      return ('#772aa8');
    } else {
      return ('#d633ff');
    }
  }


  /**
   * Displays tooltip when hovering over a marker
   * @param d data which is displayed as a circle
   */
  private showTooltip(d) {
    this.tooltip.transition()
      .duration(1)
      .style('opacity', .98);
    this.tooltip.html(d.name)
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px');
  }


  /**
   * Let's the tooltip disappear when hovering out of a marker
   */
  private removeTooltip() {
    this.tooltip.transition()
      .duration(500)
      .style('opacity', 0);
  }

  private formatValues(attribute: any, value: string) {
    if (attribute.nameDE.includes('Anteil')) {
      if (parseFloat(value) > 1) {
        return (parseFloat(value) / 100).toLocaleString('de-CH', { style: 'percent', minimumFractionDigits: 3});
      } else {
        return parseFloat(value).toLocaleString('de-CH', { style: 'percent', minimumFractionDigits: 3});
      }
    } else {
      return parseFloat(value).toLocaleString('de-CH', { maximumFractionDigits: 3});
    }
  }

  private resetCheckBoxes () {
    const allCheckboxContainers = document.getElementsByName('checkbox');
    for (let i = 0; i < allCheckboxContainers.length; i++) {
      (<HTMLInputElement>allCheckboxContainers[i]).checked = false;
    }

    for (const key in this.checkBoxDictionary) {
      if (this.checkBoxDictionary.hasOwnProperty(key)) {
        for (const innerKey in this.checkBoxDictionary[key]) {
          if (this.checkBoxDictionary[key].hasOwnProperty(innerKey)) {
            this.checkBoxDictionary[key][innerKey] = false;
          }
        }
      }
    }
  }

  /**
   * Updates the selected/deselected option for the given category and code.
   *
   * @param {string} category the categorical attribute
   * @param {string} code the code of the selected/deselected option
   */
  updateSelectedCategoryOption(category: string, code: string) {
    this.checkBoxDictionary[category][code] = !this.checkBoxDictionary[category][code];

    this.showOptionsForSelectedCategoricalAttribute(
      this.allCategoricalAttributes.filter(obj => obj.code === category)[0]
    );

    if (true) {
      this.updateCircles();
    }

  }

  initializeCheckBoxDictionary(dictionary: any) {
    this.checkBoxDictionary = dictionary;
  }

  /**
   * Displays the options according to the chosen categorical attribute
   * on the menu (categorical-attributes)
   * @param categoricalAttribute selected categorical Attribute from Dropdown1
   */
  showOptionsForSelectedCategoricalAttribute(categoricalAttribute) {
    // hide all categorical attributes
    for (let i = 0; i < this.allCategoricalAttributes.length; i++) {
      this.hideAllOptions(this.allCategoricalAttributes[i].code);
    }
    // only display the selected one
    this.toggleOptions(categoricalAttribute.code);
  }

  /**
   * Initializes the dataset for displaying only the hospitals according to the
   * selected options from the categorical attributes.
   */
  private updateCircles() {
    this.filteredHospitals = this.filter(this.allHospitals, this.checkBoxDictionary);
    this.initMapData(this.filteredHospitals, this.selectedHospitalTypes);

    this.removeCircles();
    this.initCircles(this.modifiedHospitals);
  }


  /**
   * Displays only the options for the selected categorical attribute
   * @param inputCode selected categorical Attribute from Dropdown1
   */
  toggleOptions(inputCode: string) {
    const x = document.getElementById(inputCode);

    if (x !== null) {
      try {

        if (x.style.display === 'none') {
          x.style.display = 'block';
        } else {
          x.style.display = 'none';
        }
      } catch (err) {
        console.error('error in toggleOptions', err);
      }
    }
  }

  /**
   * Hides all options of all categorical attributes before displaying
   * the default or the selected one
   */
  hideAllOptions(inputCode: string) {
    if (document.getElementById(inputCode) !== null) {
      document.getElementById(inputCode).style.display = 'none';
    }
  }

  private filter (hospitalsToFilter: any, checkBoxDictionary: any) {
    const filteredHospitalData = [];

    for (let i = 0; i < hospitalsToFilter.length; i++) {
      let skip = true;

      for (let j = 0; j < hospitalsToFilter[i].hospital_attributes.length; j++) {

        const currentCode = hospitalsToFilter[i].hospital_attributes[j].code;
        let checkPerformed = false;

        // check only the attributes who are the current selected attribute
        // and who are part of the categorical attributes (in allDict)
        if ((currentCode === this.currentCategoricalAttribute.code)  && (currentCode in checkBoxDictionary)) {

          const checkedAttributes = [];
          for (const key in checkBoxDictionary[currentCode]) {
            if (checkBoxDictionary[currentCode][key]) {
              checkedAttributes.push(key);
            }
          }

          if (checkedAttributes.length === 0) {
            skip = false;
            checkPerformed = true;
            break;
          }

          if (this.singleClassCategories.indexOf(this.currentCategoricalAttribute.code) >= 0) {
            for (let key = 0; key < checkedAttributes.length; key++) {
              if (hospitalsToFilter[i].hospital_attributes[j].value.includes(checkedAttributes[key])) {
                skip = false;
                checkPerformed = true;
                break;
              }
            }
            checkPerformed = true;
          } else if (this.multiClassCategories.indexOf(this.currentCategoricalAttribute.code) >= 0) {
            let containsEverySelectedKey = true;

            for (let key = 0; key < checkedAttributes.length; key++) {
              if (!hospitalsToFilter[i].hospital_attributes[j].value.includes(checkedAttributes[key])) {
                containsEverySelectedKey = false;
              }
            }

            if (containsEverySelectedKey) {
              skip = false;
            }

            checkPerformed = true;
          }

        } else {
          // attribute is not part of the filter dictionary
          continue;
        }
        // if we checked the currentCatAttribute we are done
        if (checkPerformed) {
          break;
        }
      }

      // if skip is true, we don't add the hospital and continue with the next
      if (!skip) {
        filteredHospitalData.push(hospitalsToFilter[i]);
      }
    }
    return filteredHospitalData;
  }

  private getAllDataForClickedHospital(clickedHospital: Hospital) {
    return this.allHospitals.find(obj => obj.name === clickedHospital.name);
  }
}

