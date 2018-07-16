import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Hospital } from '../models/hospital.model';
import { CharacteristicsService } from './characteristics.service';

import * as d3 from 'd3';
import { Attribute } from "../models/attribute.model";
import { HospitalService } from "./hospital.service";
import { Variable } from "../models/variable.model";

declare const L;

@Injectable()
export class D3Service {

  private svg;
  private map;
  private tooltip;

  private hospitals: Array<Hospital> = null;
  private selectedHospitals: Array<Hospital> = null;

  private selectedNumericalAttribute: Attribute = null;
  private selectedCategoricalAttribute: Attribute = null;

  private modifiedHospitals: Array<any> = null;
  private filteredHospitals: Array<Hospital> = null;
  private selectedHospitalTypes: Array<string> = null;

  private circles;

  // Todo: remove this as soon as backend can deliver the data
  private singleClassCategories = ['RForm'];
  private multiClassCategories = ['Akt', 'SL', 'WB', 'SA', 'LA'];

  private xCoordinateAttribute: Attribute = null;
  private yCoordinateAttribute: Attribute = null;

  private sumOfXValues: number = 0;
  private sumOfYValues: number = 0;

  private width;
  private height;
  private margin = { top: 20, right: 20, bottom: 60, left: 100 };

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
    private hospitalService: HospitalService
  ) {
    this.initDefaultValues();
  }

  private async initDefaultValues () {


    this.characteristicsService.getAttributeByName('EtMedL').subscribe((attribute: Attribute) => {
      this.selectedNumericalAttribute = attribute;
    });

    this.characteristicsService.getAttributeByName('KT').subscribe((attribute: Attribute) => {
      this.selectedCategoricalAttribute = attribute;
    });
  }

  setXCoordinateAttribute(attribute: Attribute) {
    this.xCoordinateAttribute = attribute;
  }

  getXCoordinateAttribute() {
    return this.xCoordinateAttribute;
  }

  setYCoordinateAttribute(attribute: Attribute) {
    this.yCoordinateAttribute = attribute;
  }

  getYCoordinateAttribute() {
    return this.yCoordinateAttribute;
  }

  getSelectedNumericalAttribute() {
    return this.selectedNumericalAttribute;
  }

  getSelectedCategoricalAttribute() {
    return this.selectedCategoricalAttribute;
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
   * @param hospital data which is displayed as a circle
   * @returns {string} color of the marker (according to type)
   */
  private static getColourBasedOnHospitalType(hospital: Hospital)  {
    if (hospital.typ === 'K111') {
      return '#a82a2a';
    } else if (hospital.typ === 'K112') {
      return '#a89f2a';
    } else if (hospital.typ === 'K121' || hospital.typ === 'K122' || hospital.typ === 'K123') {
      return '#2ca82a';
    } else if (hospital.typ === 'K211' || hospital.typ === 'K212') {
      return '#2a8ea8';
    } else if (hospital.typ === 'K221') {
      return '#2c2aa8';
    } else if (hospital.typ === 'K231' || hospital.typ === 'K232' || hospital.typ === 'K233' || hospital.typ === 'K234' || hospital.typ === 'K235') {
      return '#772aa8';
    } else {
      return '#d633ff';
    }
  }

  /**
   * Returns the maximal value of the chosen numerical attribute
   * @param selectedHospitals data which is displayed as a circle
   * @returns {number} maximal radius of the chosen attribute
   */
  private getMaxRadius (selectedHospitals: Array<Hospital>) {
    const radiuses = [];

    selectedHospitals.forEach( (hospital) => {
        radiuses.push(
          {radius: Number(this.getValueOfVariable(hospital.attributes.filter(obj => Object.keys(obj)[0] === this.selectedNumericalAttribute.code)[0]))}
        )
    });

    return radiuses.reduce((max, p) => p.radius > max ? p.radius : max, radiuses[0].radius);
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

  setCurrentCategoricalAttribute(attribute: Attribute) {
    this.currentCategoricalAttributeSource.next(attribute);
  }

  setCurrentNumericalAttribute(attribute: Attribute) {
    this.currentNumericalAttributeSource.next(attribute);
  }

  setSelectedHospital(attribute: Attribute) {
    this.selectedHospitalSource.next(attribute);
  }

  async drawMap() {
    this.hospitals = await this.hospitalService.getHospitals().toPromise();

    this.filteredHospitals = [];
    this.selectedHospitalTypes = [];
    this.initializeMap();
    this.addSVGelement();

    this.selectedHospitals = this.initMapData(this.hospitals);
    this.calculateSVGBounds(this.selectedHospitals);
    this.initCircles(this.selectedHospitals);

    this.initTooltip();
    this.initZoomableBehaviour();
  }

  async drawGraph () {
    this.hospitals = await this.hospitalService.getHospitals().toPromise();

    this.xCoordinateAttribute = await this.characteristicsService.getAttributeByName('EtMedL').toPromise();
    this.yCoordinateAttribute = await this.characteristicsService.getAttributeByName('CMIb').toPromise();

    this.filteredHospitals = [];
    this.selectedHospitalTypes = [];

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

  updateAttribute(attribute: Attribute, axis: string) {
    if (D3Service.showMap()) {

      if (CharacteristicsService.isCategoricalAttribute(attribute)) {
        this.selectedCategoricalAttribute = attribute;
        this.updateMap('categoricalAttribute');

      } else if (CharacteristicsService.isNumericalAttribute(attribute)) {
        this.selectedNumericalAttribute = attribute;
        this.updateMap('numericalAttribute');

      } else {
        console.error(`Attribute ${attribute} neither categorical nor numerical attribute!`);
      }
    } else {
      if (axis === 'x') {
        this.xCoordinateAttribute = attribute;
      } else {
        this.yCoordinateAttribute = attribute;
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
      '<a href=' + linkToData + ' target="_blank" style="color: #DF691A;">data by BAG / FOPH</a>',
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
   * @param {Hospital[]} hospitals
   */
  private calculateSVGBounds(hospitals: Array<Hospital>) {
    let xMax = 0;
    let yMax = 0;
    const heightPadding = 100;
    const widthPadding = 300;

    hospitals.forEach((d) => {
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
      const maxValue = this.getMaxRadius(this.selectedHospitals);
      this.circles
        .attr('cx', (d) => { return this.projectPoint(d.longitude, d.latitude).x; })
        .attr('cy', (d) => { return this.projectPoint(d.longitude, d.latitude).y; })
        .attr('r', (d) => { return this.calculateCircleRadius(d, maxValue); });

      this.calculateSVGBounds(this.hospitals);
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
   * @param {Hospital[]} hospitals
   */
  private initMapData (hospitals: Array<Hospital>): Array<Hospital> {
    const selectedHospitals = [];

    for (let i = 0; i < hospitals.length; i++) {

      const currentHospital = hospitals[i];
      const name = currentHospital.name === 'Ganze Schweiz' ? null : currentHospital.name;
      const latitude = currentHospital.latitude;
      const longitude = currentHospital.longitude;

      if (name !== null && latitude !== null && longitude !== null && this.hasAttribute(currentHospital, this.selectedNumericalAttribute)) {

        if (this.selectedHospitalTypes.length === 0 || this.selectedHospitalTypes.indexOf(currentHospital.typ) > -1) {
          selectedHospitals.push(currentHospital);
        }
      }
    }

    return selectedHospitals;
  }

  private hasAttribute(hospital: Hospital, attribute: Attribute): boolean {
    const result = hospital.attributes.filter(obj => Object.keys(obj)[0] === attribute.code)
    return result != null && result.length > 0;
  }

  private getValueOfVariable(variable: Variable): string | number {
    return variable[Object.keys(variable)[0]].value;
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
   * @param {Array} selectedHospitals data that is visualized as circles (with x- and y-coordinates and radius r)
   */
  private initCircles (selectedHospitals: Array<Hospital>) {
    const maxRadius = this.getMaxRadius(selectedHospitals);

    this.circles = this.svg.selectAll('circle')
      .data(selectedHospitals)
      .enter()
      .append('circle')
      .style('fill-opacity', 0.7)
      .attr('r', (hospital) => {
        return this.calculateCircleRadius(hospital, maxRadius);
      })
      .attr('fill', (hospital) => {
        return D3Service.getColourBasedOnHospitalType(hospital);
      })
      .attr('stroke', (hospital) => {
        return D3Service.getColourBasedOnHospitalType(hospital);
      })
      .attr('cx', (hospital) => {
        return this.projectPoint(hospital.longitude, hospital.latitude).x;
      })
      .attr('cy', (hospital) => {
        return this.projectPoint(hospital.longitude, hospital.latitude).y;
      })
      .on('mouseover', (hospital) => {
        return this.showTooltip(hospital);
      })
      .on('mouseout', () => {
        return this.removeTooltip();
      })
      .on('click', (hospital) => {
        this.setSelectedHospital(hospital);
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
      data = this.hospitals;
      this.filteredHospitals = [];
      this.resetCheckBoxes();

    } else if (changedAttribute === 'numericalAttribute' || changedAttribute === 'hospitalTypes') {
      data = (this.filteredHospitals.length !== 0) ? this.filteredHospitals : this.hospitals;
    }

    this.removeCircles();
    this.selectedHospitals = this.initMapData(data);
    this.initCircles(this.selectedHospitals);
  }

  /**
   * Gives markers different radius according to the numerical attribute
   * @param hospital hospital which is displayed as a circle
   * @param maxValue
   * @returns {number} radius of the marker (according numerical attribute)
   */
  private calculateCircleRadius (hospital: Hospital, maxValue: number) {
    let radius;
    const variable = hospital.attributes.filter(obj => Object.keys(obj)[0] === this.selectedNumericalAttribute.code)[0];

    if (variable == null || this.getValueOfVariable(variable) == null) {
      return;
    } else {
      radius = Number(this.getValueOfVariable(variable));
    }

    const zoomLevel = this.map.getZoom();
    if (radius === 0) {
      return 3 * zoomLevel * zoomLevel / 100; // circles with value 0 have radius 3
    } else {
      return ((radius / maxValue) * 40 + 5) * zoomLevel * zoomLevel / 100;
    }
  }


  /**
   * Displays tooltip when hovering over a marker
   * @param hospital data which is displayed as a circle
   */
  private showTooltip(d: any) {
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
    this.filteredHospitals = this.filter(this.hospitals, this.checkBoxDictionary);

    if (this.filteredHospitals.length > 0) {
      this.selectedHospitals = this.initMapData(this.filteredHospitals);
      this.removeCircles();
      this.initCircles(this.selectedHospitals);
    }

  }


  private filter (hospitals: Array<Hospital>, checkBoxDictionary: any): Array<Hospital> {
    const filteredHospitals: Array<Hospital> = [];

    for (let i = 0; i < hospitals.length; i++) {
      let currentHospital = hospitals[i];

      const variableToCheck = currentHospital.attributes.filter(obj => Object.keys(obj)[0] === this.selectedCategoricalAttribute.code)[0];
      const code = Object.keys(variableToCheck)[0];
      const values = variableToCheck[code].value.split(',').map((value) => value.trim());

      if (code in checkBoxDictionary) {

        const selectedAttributeOptions = [];
        for (const key in checkBoxDictionary[code]) {
          if (checkBoxDictionary[code][key]) {
            selectedAttributeOptions.push(key.trim());
          }
        }

        if (this.singleClassCategories.indexOf(code) >= 0) {
          for (let key = 0; key < selectedAttributeOptions.length; key++) {
            if (values.indexOf(selectedAttributeOptions[key]) > -1) {
              filteredHospitals.push(currentHospital)
            }
          }
        } else if (this.multiClassCategories.indexOf(code) >= 0) {
          let containsEverySelectedKey = true;

          for (let key = 0; key < selectedAttributeOptions.length; key++) {
            if (values.indexOf(selectedAttributeOptions[key]) === -1) {
              containsEverySelectedKey = false;
            }
          }

          if (containsEverySelectedKey) {
            filteredHospitals.push(currentHospital);
          }
        }

      }
    }
    return filteredHospitals;
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
      .attr('x', this.width / 2)
      .attr('y', this.margin.bottom / 2)
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
      .style('font-size', '.8rem')
      .text(this.xCoordinateAttribute.name_de);

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
      .attr('y', - this.margin.left / 2)
      .attr('x', - this.height / 2)
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
      .style('font-size', '.8rem')
      .text(this.yCoordinateAttribute.name_de);
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

    for (let i = 0; i < this.hospitals.length; i++) {

      const hospitalName = this.hospitals[i].name;
      const attributes = this.hospitals[i].attributes;
      let type;

      if (hospitalName === 'Ganze Schweiz') {
        continue;
      }

      const xCoordinate = attributes.filter(obj => Object.keys(obj)[0] === this.xCoordinateAttribute.code)[0];
      const yCoordinate = attributes.filter(obj => Object.keys(obj)[0] === this.yCoordinateAttribute.code)[0];

      if (xCoordinate == null || xCoordinate[Object.keys(xCoordinate)[0]].value == null || yCoordinate == null || yCoordinate[Object.keys(yCoordinate)[0]].value == null) {
        continue;
      }

      const xCoordinateValue: number = Number(xCoordinate[Object.keys(xCoordinate)[0]].value);
      const yCoordinateValue: number = Number(yCoordinate[Object.keys(yCoordinate)[0]].value);

      let typeResult = attributes.find(obj => Object.keys(obj)[0] === 'Typ');

      if (typeResult == null || typeResult[Object.keys(typeResult)[0]].value == null) {
        typeResult = null;
      } else {
        type = String(typeResult[Object.keys(typeResult)[0]].value);
      }

      if (type && (this.selectedHospitalTypes.length === 0 || (this.selectedHospitalTypes.length > 0 && this.selectedHospitalTypes.indexOf(type) > -1))) {
        this.sumOfXValues += xCoordinateValue;
        this.sumOfYValues += yCoordinateValue;
        this.modifiedHospitals.push({
          name: hospitalName,
          x: xCoordinateValue,
          y: yCoordinateValue,
          Typ: type,
          yhat: null
        });
      }
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
    for (let i = 0; i < this.hospitals.length; i++) {
      const hospital = this.modifiedHospitals.find(obj => obj.name === this.hospitals[i].name);
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

