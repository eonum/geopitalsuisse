import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Hospital } from '../models/hospital.model';
import { CharacteristicsService } from './characteristics.service';

import * as d3 from 'd3';

declare const L;

@Injectable()
export class D3Service {

  private svg;
  private map;
  private tooltip;

  private allHospitals = [];
  private allNumericalAttributes = [];
  private allCategoricalAttributes = [];

  private currentNumericalAttribute;
  private currentCategoricalAttribute;

  private modifiedHospitals;
  private filteredHospitals = [];
  private selectedHospitalTypes = [];

  private circles;

  // Todo: remove this as soon as backend can deliver the data
  private singleClassCategories = ['RForm'];
  private multiClassCategories = ['Akt', 'SL', 'WB', 'SA', 'LA'];

  private xCoordinateNumAttribute;
  private yCoordinateNumAttribute;

  private sumOfXValues = 0;
  private sumOfYValues = 0;

  private width;
  private height;
  private margin = { top: 20, right: 15, bottom: 20, left: 50 };

  private xScale;
  private yScale;
  private xAxis;
  private yAxis;

  private correlationCoefficient;

  private RformDict = {'R1': false, 'R2': false, 'R3': false, 'R4': false};
  private AktDict   = {'A': false, 'B': false, 'P': false, 'R': false};
  private SLDict    = {'IPS': false, 'NF': false};
  private WBDict    = {'Arzt': false, 'BGs': false, 'MSt': false};
  private SADict    = {'Angio': false, 'CC': false, 'CT': false, 'Dia': false, 'LB': false, 'Lito': false, 'MRI': false, 'PET': false};
  private LADict    = {'Stat': false, 'Amb': false};

  private checkBoxDictionary = {
    'RForm': this.RformDict,
    'Akt': this.AktDict,
    'SL': this.SLDict,
    'WB': this.WBDict,
    'SA': this.SADict,
    'LA': this.LADict};

  // Observable string sources
  private currentNumericalAttributeSource = new Subject<any>();
  private currentCategoricalAttributeSource = new Subject<any>();
  private selectedHospitalSource = new Subject<any>();

  // Observable string streams
  currentNumericalAttribute$ = this.currentNumericalAttributeSource.asObservable();
  currentCategoricalAttribute$ = this.currentCategoricalAttributeSource.asObservable();
  selectedHospital$ = this.selectedHospitalSource.asObservable();

  constructor(
    private characteristicsService: CharacteristicsService,
  ) {}


  /* Public static methods */

  // Todo: remove this as soon as backend can deliver the data
  static getDefaultNumericalAttribute(): any {
    return {
      category: 'number',
      code: 'EtMedL',
      nameDE: 'Ertrag aus medizinischen Leistungen und Pflege',
      nameFR: 'Produits des hospitalisations et soins',
      nameIT: 'Ricavi per degenze e cure'};
  }

  // Todo: remove this as soon as backend can deliver the data
  static getDefaultCategoricalAttribute(): any {
    return {
      category: 'string',
      code: 'RForm',
      nameDE: 'Rechtsform',
      nameFR: 'Forme juridique',
      nameIT: 'Forma giuridica'
    };
  }

  // Todo: remove this as soon as backend can deliver the data
  static getDefaultXAxisAttribute(): any {
    return {
      category: 'number',
      code: 'CMIb',
      nameDE: 'Casemix Index (CMI) brutto',
      nameFR: 'Indice de casemix (CMI) brut',
      nameIT: 'Casemix Index lordo (CMI)',
    };
  }

  // Todo: remove this as soon as backend can deliver the data
  static getDefaultYAxisAttribute(): any {
    return {
      category: 'number',
      code: 'EtMedL',
      nameDE: 'Ertrag aus medizinischen Leistungen und Pflege',
      nameFR: 'Produits des hospitalisations et soins',
      nameIT: 'Ricavi per degenze e cure'
    };
  }

  /**
   * Indicates whether the map or the scatterplot is active.
   *
   * @returns {boolean} true if the map is shown, false if the scatterplot is shown
   */
  static showMap() {
    return document.getElementById('mapid') !== null;
  }

  /* Private static methods */
  /**
   * Gives markers different color according to its type attribute
   * @param d data which is displayed as a circle
   * @returns {string} color of the marker (according to type)
   */
  private static getColourBasedOnHospitalType(d)  {
    if (d.Typ === 'K111') {
      return '#a82a2a';
    } else if (d.Typ === 'K112') {
      return '#a89f2a';
    } else if (d.Typ === 'K121' || d.Typ === 'K122' || d.Typ === 'K123') {
      return '#2ca82a';
    } else if (d.Typ === 'K211' || d.Typ === 'K212') {
      return '#2a8ea8';
    } else if (d.Typ === 'K221') {
      return '#2c2aa8';
    } else if (d.Typ === 'K231' || d.Typ === 'K232' || d.Typ === 'K233' || d.Typ === 'K234' || d.Typ === 'K235') {
      return '#772aa8';
    } else {
      return '#d633ff';
    }
  }

  /**
   * Returns the maximal value of the chosen numerical attribute
   * @param currentHospitals data which is displayed as a circle
   * @returns {number} maximal radius of the chosen attribute
   */
  private static getMaxRadius (currentHospitals: any) {
    return currentHospitals.reduce((max, p) => p.radius > max ? p.radius : max, currentHospitals[0].radius);
  }

  private static xValue(d) {
    return d.x;
  }

  private static yValue(d) {
    return d.y;
  }

  private static yHatValue(d) {
    return d.yhat;
  }

  /* Public methods */

  setCurrentCategoricalAttribute(attribute: any) {
    this.currentCategoricalAttributeSource.next(attribute);
  }

  setCurrentNumericalAttribute(attribute: any) {
    this.currentNumericalAttributeSource.next(attribute);
  }

  setSelectedHospital(attribute: any) {
    this.selectedHospitalSource.next(attribute);
  }

  drawMap(hospitals, numericalAttributes, categoricalAttributes) {
    /* ------------------------ Reset variables ------------------------------------------ */
    this.filteredHospitals = [];
    this.selectedHospitalTypes = [];

    /* ------------------------ Initialize map ------------------------------------------ */
    this.initializeMap();

    /* --------------------- Initialize data --------------------------------- */
    this.allHospitals = hospitals;
    this.allNumericalAttributes = numericalAttributes;
    this.allCategoricalAttributes = categoricalAttributes;
    this.currentNumericalAttribute = D3Service.getDefaultNumericalAttribute();
    this.currentCategoricalAttribute = D3Service.getDefaultCategoricalAttribute();
    this.initMapData(this.allHospitals);

    /* ------------------------ Initialize svg element, tooltip, circles and zoom ------- */
    this.addSVGelement();
    this.calculateSVGBounds(this.allHospitals);
    this.initTooltip();
    this.initCircles(this.modifiedHospitals);
    this.initZoomableBehaviour();
  }

  drawGraph(hospitals, numAttributes) {
    this.filteredHospitals = [];
    this.selectedHospitalTypes = [];
    this.allHospitals = hospitals;
    this.allNumericalAttributes = numAttributes;
    this.xCoordinateNumAttribute = D3Service.getDefaultXAxisAttribute();
    this.yCoordinateNumAttribute = D3Service.getDefaultYAxisAttribute();

    // add the graph canvas to the body of the webpage
    this.initializeGraph();

    // add the tooltip area to the webpage
    this.initTooltip();

    // modify data
    this.initScatterPlotData();

    // scale axes so they do not overlap
    this.scale(this.modifiedHospitals);

    // calculate Line of Best Fit (Least Square Method)
    this.calculateRegression();

    // draw x and y axis
    this.drawAxes();

    if (this.correlationCoefficient != null && !isNaN(this.correlationCoefficient)) {
      // draw legend
      this.drawLegend();
    }

    // draw regression line
    this.drawRegressionLine(this.modifiedHospitals);

    // draw a dot for every hospital
    this.drawDots(this.modifiedHospitals);
  }

  /**
   * Updates the selected hospital types based on how many times the checkbox has been clicked.
   * An odd number means that the checkbox is checked and therefore hospitals of that type should be shown.
   *
   * @param numUniSp  number of times 'Universitätsspitäler' checkbox was pressed
   * @param numZentSp  number of times 'Zentrumsspitäler' checkbox was pressed
   * @param numGrundVers number of times 'Grundversorgung' checkbox was pressed
   * @param numPsychKl number of times 'Psychiatrische Kliniken' checkbox was pressed
   * @param numRehaKl number of times 'Rehabilitationskliniken' checkbox was pressed
   * @param numSpezKl number of times 'Spezialkliniken' checkbox was pressed
   */
  updateSelectedHospitalTypes(numUniSp, numZentSp, numGrundVers, numPsychKl, numRehaKl, numSpezKl) {
    this.selectedHospitalTypes = [];

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

    if (D3Service.showMap()) {
      this.updateMap('hospitalTypes');
    } else {
      this.updateGraph();
    }
  }

  updateAttribute(attribute: any, axis: string) {
    if (D3Service.showMap()) {

      if (this.characteristicsService.isCategoricalAttribute(attribute)) {
        this.currentCategoricalAttribute = attribute;
        this.updateMap('categoricalAttribute');

      } else if (this.characteristicsService.isNumericalAttribute(attribute)) {
        this.currentNumericalAttribute = attribute;
        this.updateMap('numericalAttribute');

      } else {
        console.error(`Attribute ${attribute} neither categorical nor numerical attribute!`);
      }
    } else {
      if (axis === 'x') {
        this.xCoordinateNumAttribute = attribute;
      } else {
        this.yCoordinateNumAttribute = attribute;
      }
      this.updateGraph();
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
    this.updateCircles();
  }

  /* Private methods */
  private initializeGraph() {
    this.width = document.getElementById('graph').clientWidth - this.margin.left - this.margin.right;
    this.height = this.width / 1.5 - this.margin.bottom - this.margin.top;

    this.svg = d3.select('#graph').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .style('background-color', 'white')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  /**
   * Initialize the map using OpenStreetMap tiles with custom design using mapbox.
   */
  private initializeMap () {
    const linkToMap = 'https://api.mapbox.com/styles/v1/nathi/cjf8cggx93p3u2qrqrgwoh5nh/tiles/256/{z}/{x}/{y}?access_' +
      'token=pk.eyJ1IjoibmF0aGkiLCJhIjoiY2pmOGJ4ZXJmMXMyZDJ4bzRoYWRxbzhteCJ9.x2dbGjsVZTA9HLw6VWaQow';
    const linkToBlog = 'http://eonum.ch/de/allgemein/geopitalsuisse/';
    const linkToData = 'https://www.bag.admin.ch/bag/de/home/service/zahlen-fakten/zahlen-fakten-zu-spitaelern/' +
      'kennzahlen-der-schweizer-spitaeler.html';

    this.map = L.map('mapid', {
      center: [46.818188, 8.97512],
      zoom: 8,
      maxZoom: 16,
    });

    L.tileLayer(
      linkToMap, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>' + '<br>' +
      '<a href=' + linkToBlog + ' target="_blank" style="color: #DF691A;">created by eonum & University of Berne</a> | ' +
      '<a href=' + linkToData + ' target="_blank" style="color: #DF691A;">data by BFS / FSO</a>',
      id: 'mapbox.streets'
    }).addTo(this.map);
  }

  /**
   * Add SVG element to leaflet's overlay pane (group layers)
   */
  private addSVGelement() {
    this.svg = d3.select(this.map.getPanes().overlayPane).append('svg').attr('id', 'circleSVG');
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

  /**
   * Initializes zoom behaviour. Makes points invisible when user starts zooming
   * and show them again when he has finished zooming.
   *
   */
  private initZoomableBehaviour() {
    this.map.addEventListener('touchstart', this.handleTouch);
    this.map.addEventListener('touchend', this.handleTouch);
    this.map.addEventListener('click', this.handleTouch);

    this.map.on('zoomstart', () => {
      d3.select('#circleSVG').style('visibility', 'hidden');
    });

    this.map.on('zoomend', () => {
      const maxValue = D3Service.getMaxRadius(this.modifiedHospitals);
      this.circles
        .attr('cx', (d) => { return this.projectPoint(d.longitude, d.latitude).x; })
        .attr('cy', (d) => { return this.projectPoint(d.longitude, d.latitude).y; })
        .attr('r', (d) => { return this.calculateCircleRadius(d, maxValue); });

      this.calculateSVGBounds(this.allHospitals);
      d3.select('#circleSVG').style('visibility', 'visible');
    });
  }

  private handleTouch (e) {
    if ( (e.type === 'touchmove' || e.type === 'touchstart' ) && e.touches.length === 1) {
      this.disableInteractions();
    }
  }

  private disableInteractions () {
    this.map.dragging.disable();
    this.map.scrollWheelZoom.disable();
    if (this.map.tap) {
      this.map.tap.disable();
    }
  }

  /**
   * Stores data in array for displaying it. Builds up array with the important information.
   *
   * @param {Hospital[]} allHospitals
   */
  private initMapData (allHospitals: any) {
    this.modifiedHospitals = [];

    for (let i = 0; i < allHospitals.length; i++) {

      const currentHospital = allHospitals[i];
      const name = currentHospital.name;
      const latitude = currentHospital.latitude;
      const longitude = currentHospital.longitude;
      const attributes = currentHospital.hospital_attributes;

      if (name !== null && latitude !== null && longitude !== null) {
        let sizeAttribute;
        let typeAttribute ;

        const sizeResult = attributes.find(obj => obj.code === this.currentNumericalAttribute.code );
        const typeResult = attributes.find(obj => obj.code === 'Typ' );

        if (sizeResult == null || sizeResult.value == null) {
          continue;
        } else {
          sizeAttribute = Number(sizeResult.value);
        }

        if (typeResult == null || typeResult.value == null) {
          typeAttribute = null;
        } else {
          typeAttribute = String(typeResult.value);
        }

        const basicInformation = {longitude: longitude, latitude: latitude, name: name, radius: sizeAttribute, Typ: typeAttribute};

        if (this.selectedHospitalTypes.length === 0 || this.selectedHospitalTypes.indexOf(typeAttribute) > -1) {
          this.modifiedHospitals.push(basicInformation);
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

  /**
   * Initialize the tooltip.
   */
  private initTooltip() {
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0.0);
  }

  /**
   * Initialize circles on the map for the given hospitals. Use the maximal radius
   * of all hospitals to calculate the circle radius for every hospital.
   *
   * @param {Array} currentHospitals data that is visualized as circles (with x- and y-coordinates and radius r)
   */
  private initCircles (currentHospitals: Hospital[]) {
    const maxRadius = D3Service.getMaxRadius(currentHospitals);

    this.circles = this.svg.selectAll('circle')
      .data(currentHospitals)
      .enter()
      .append('circle')
      .style('fill-opacity', 0.7)
      .attr('r', (d) => {
        return this.calculateCircleRadius(d, maxRadius);
      })
      .attr('fill', (d) => {
        return D3Service.getColourBasedOnHospitalType(d);
      })
      .attr('stroke', (d) => {
        return D3Service.getColourBasedOnHospitalType(d);
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
        this.setSelectedHospital(d);
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
   *
   * @param {string} changedAttribute
   */
  private updateMap(changedAttribute: string) {
    let data;

    if (changedAttribute === 'categoricalAttribute') {
      data = this.allHospitals;
      this.filteredHospitals = [];
      this.resetCheckBoxes();

    } else if (changedAttribute === 'numericalAttribute' || changedAttribute === 'hospitalTypes') {
      data = (this.filteredHospitals.length !== 0) ? this.filteredHospitals : this.allHospitals;
    }

    this.removeCircles();
    this.initMapData(data);
    this.initCircles(this.modifiedHospitals);
  }

  /**
   * Gives markers different radius according to the numerical attribute
   * @param d data which is displayed as a circle
   * @param maxValue
   * @returns {number} radius of the marker (according numerical attribute)
   */
  private calculateCircleRadius (d: any, maxValue: any) {
    const zoomLevel = this.map.getZoom();
    if (d.radius === 0) {
      return 3 * zoomLevel * zoomLevel / 100; // circles with value 0 have radius 3
    } else {
      return ((d.radius / maxValue) * 40 + 5) * zoomLevel * zoomLevel / 100;
    }
  }


  /**
   * Displays tooltip when hovering over a marker
   * @param d data which is displayed as a circle
   */
  private showTooltip(d) {
    this.tooltip.transition()
      .duration(100)
      .style('opacity', .98)
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px');

    if (!D3Service.showMap()) {
      this.tooltip.html(d.name + '<br/> (' + D3Service.xValue(d) + ', ' + D3Service.yValue(d) + ')');
    } else {
      this.tooltip.html(d.name);
    }
  }


  /**
   * Let's the tooltip disappear when hovering out of a marker
   */
  private removeTooltip() {
    this.tooltip.transition()
      .duration(500)
      .style('opacity', 0);
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
   * Initializes the dataset for displaying only the hospitals according to the
   * selected options from the categorical attributes.
   */
  private updateCircles() {
    this.filteredHospitals = this.filter(this.allHospitals, this.checkBoxDictionary);
    this.initMapData(this.filteredHospitals);
    this.removeCircles();
    this.initCircles(this.modifiedHospitals);
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

  private scale(data) {
    this.xScale = d3.scaleLinear()
      .domain([Math.min(Number(d3.min(data, d => D3Service.xValue(d))), 0), Number(d3.max(data, d => D3Service.xValue(d)))])
      .range([0, this.width]);

    this.yScale = d3.scaleLinear()
      .domain([Math.min(Number(d3.min(data, d => D3Service.yValue(d))), 0), Number(d3.max(data, d => D3Service.yValue(d)))])
      .range([this.height, 0]);

    this.xAxis = d3.axisBottom(this.xScale);
    this.yAxis = d3.axisLeft(this.yScale);
  }

  private drawAxes() {
    this.svg.append('g')
      .classed('x', true)
      .classed('axis', true)
      .attr('transform', 'translate(0,' + this.height + ')')
      .call((this.xAxis)
        .tickFormat((d) => {
          if (d < 1) {
           return d3.format(',.1f')(d);
          } else {
            return d3.format(',.5~s')(d);
          }
        }))
      .append('text')
      .attr('x', this.width)
      .attr('y', -6)
      .attr('fill', '#000')
      .style('text-anchor', 'end')
      .text(this.xCoordinateNumAttribute.nameDE);

    this.svg.append('g')
      .classed('y', true)
      .classed('axis', true)
      .call((this.yAxis)
        .tickFormat((d) => {
          if (d < 1) {
            return d3.format(',.1f')(d);
          } else {
            return d3.format(',.5~s')(d);
          }
        }))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .attr('fill', '#000')
      .style('text-anchor', 'end')
      .text(this.yCoordinateNumAttribute.nameDE);
  }

  private drawRegressionLine(data) {
    data = data.sort((a, b) => { return (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0); } );

    const line = d3.line()
      .x(d => this.xScale(D3Service.xValue(d)))
      .y(d => this.yScale(D3Service.yHatValue(d)));

    this.svg.append('path')
      .attr('d', line(data))
      .attr('stroke', '#DF691A')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  }

  private drawLegend() {
    const label = [{text: 'Regressionslinie (Korrelation: ' + this.correlationCoefficient + ')'}];
    const legend = this.svg.append('g')
      .attr('class', 'legend');

    label.forEach(d => {
      const x = this.width - 200;
      const y = 30;

      const symbol = d3.symbol()
        .type(d3.symbolSquare)
        .size(12 * 12);

      legend.append('path')
        .attr('d', symbol)
        .attr('fill', '#DF691A')
        .attr('stroke', 'black')
        .attr('stroke-width', .5)
        .attr('transform', 'translate(' + x + ',' + y + ')');


      legend.append('text')
        .attr('class', 'legend')
        .attr('x', x + 12)
        .attr('y', y)
        .attr('dominant-baseline', 'central')
        .style('font-size', '.8rem')
        .text(d.text);
    });
  }

  private drawDots(data) {
    this.svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', 3.5)
      .attr('cx', (d) => this.xScale(D3Service.xValue(d)))
      .attr('cy', (d) => this.yScale(D3Service.yValue(d)))
      .style('fill', (d) => D3Service.getColourBasedOnHospitalType(d))
      .on('mouseover', (d) =>  {
        this.showTooltip(d);
      })
      .on('mouseout', () => {
        this.removeTooltip();
      });
  }

  private initScatterPlotData() {
    this.modifiedHospitals = [];
    this.sumOfXValues = 0;
    this.sumOfYValues = 0;

    for (let i = 0; i < this.allHospitals.length; i++) {

      const hospitalName = this.allHospitals[i].name;
      const attributes = this.allHospitals[i].hospital_attributes;
      let xCoordinateValue;
      let yCoordinateValue;
      let type;

      if (hospitalName === 'Ganze Schweiz') { continue; }

      const xCoordinate = attributes.find(obj =>  obj.code === this.xCoordinateNumAttribute.code);
      const yCoordinate = attributes.find(obj => obj.code === this.yCoordinateNumAttribute.code);

      if (xCoordinate == null || xCoordinate.value == null || yCoordinate == null || yCoordinate.value == null) {
        continue;
      }

      xCoordinateValue = Number(xCoordinate.value);
      yCoordinateValue = Number(yCoordinate.value);
      this.sumOfXValues += xCoordinateValue;
      this.sumOfYValues += yCoordinateValue;


      let typeResult = attributes.find(obj => obj.code === 'Typ');

      if (typeResult == null || typeResult.value == null) {
        typeResult = null;
      } else {
        type = String(typeResult.value);
      }

      if (this.selectedHospitalTypes.length > 0 && typeResult !== null && this.selectedHospitalTypes.indexOf(typeResult.value) === -1) {
        continue;
      }

      this.modifiedHospitals.push({name: hospitalName, x: xCoordinateValue, y: yCoordinateValue, Typ: type, yhat: null});
    }
  }

  private calculateRegression() {
    const xMean = this.sumOfXValues / this.modifiedHospitals.length;
    const yMean = this.sumOfYValues / this.modifiedHospitals.length;

    let term1 = 0;
    let term2 = 0;
    let term3 = 0;

    // calculate coefficients
    let xr = 0;
    let yr = 0;
    for (let i = 0; i < this.modifiedHospitals.length; i++) {
      xr = (this.modifiedHospitals[i].x - xMean);
      yr = (this.modifiedHospitals[i].y - yMean);
      term1 += (xr * yr);
      term2 += (xr * xr);
      term3 += (yr * yr);
    }

    const m = (term1 / term2);
    const y_intercept = (yMean - (m * xMean));
    this.correlationCoefficient = Math.round(term1 / (Math.sqrt(term2 * term3)) * 100 + Number.EPSILON) / 100;

    // perform regression
    for (let i = 0; i < this.allHospitals.length; i++) {
      const hospital = this.modifiedHospitals.find(obj => obj.name === this.allHospitals[i].name);
      if (hospital) {
        hospital.yhat = (y_intercept + (hospital.x * m));
      }
    }
  }

  private removeExistingGraph() {
    if (!D3Service.showMap() && this.svg !== null && this.svg.selectAll !== null) {
      this.svg.selectAll('.dot').remove();
      this.svg.selectAll('g').remove();
      this.svg.selectAll('path').remove();
    }
  }

  private updateGraph() {
    // delete everything
    this.removeExistingGraph();

    // add the tooltip area to the webpage
    this.initTooltip();

    // modify data
    this.initScatterPlotData();

    // scale axes so they do not overlap
    this.scale(this.modifiedHospitals);

    // calculate Line of Best Fit (Least Square Method)
    this.calculateRegression();

    // draw x and y axis
    this.drawAxes();

    if (this.correlationCoefficient != null && !isNaN(this.correlationCoefficient)) {
      // draw legend
      this.drawLegend();
    }

    // draw regression line
    this.drawRegressionLine(this.modifiedHospitals);

    // draw a dot for every hospital
    this.drawDots(this.modifiedHospitals);
  }
}

