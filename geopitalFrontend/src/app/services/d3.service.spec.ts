import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { HttpLoaderFactory } from '../app.module';

import { Hospital } from '../models/hospital.model';
import { D3Service } from './d3.service';
import { CharacteristicsService } from './characteristics.service';
import { HospitalService } from './hospital.service';
import { VariableService } from './variable.service';
import { Hospitals } from '../../mocks/data/mock-hospitals';
import { NumericalAttributes } from '../../mocks/data/mock-numerical-attributes';
import { StringAttributes } from '../../mocks/data/mock-string-attributes';

describe('D3Service', () => {
  let characteristicsService: CharacteristicsService;
  let hospitalService: HospitalService;
  let variableService: VariableService;
  let d3Service: D3Service;
  let translate: TranslateService;

  beforeEach(() => {
    characteristicsService = jasmine.createSpyObj('CharacteristicsService',
      ['isCategoricalAttribute', 'isNumericalAttribute', 'getAttributeByName', 'getStringAttributes']);
    characteristicsService.getAttributeByName.and.returnValue(of(NumericalAttributes.filter(attr => attr.code === 'EtMedL')));
    characteristicsService.getStringAttributes.and.returnValue(of(StringAttributes));

    hospitalService = jasmine.createSpyObj('HospitalService', ['getHospitalByName', 'getHospitals']);
    hospitalService.getHospitalByName.and.returnValue(of(Hospitals[0]));
    hospitalService.getHospitals.and.returnValue(of(Hospitals));

    variableService = jasmine.createSpyObj('VariableService', ['getValueOfVariable', 'getVariableOfHospitalByAttribute']);

    TestBed.configureTestingModule({
      providers: [
        D3Service,
        { provide: CharacteristicsService, useValue: characteristicsService },
        { provide: HospitalService, useValue: hospitalService },
        { provide: VariableService, useValue: variableService }
      ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    });

    characteristicsService = TestBed.get(CharacteristicsService);
    hospitalService = TestBed.get(HospitalService);
    variableService = TestBed.get(VariableService);
    d3Service = TestBed.get(D3Service);
    translate = TestBed.get(TranslateService);
  });

  it('should be created', () => {
    expect(d3Service).toBeTruthy();
  });

  it('should draw map', fakeAsync(() => {
    const selectedHospitals = Hospitals.filter(hospital => hospital.typ_aggregated === 'U');
    spyOn(d3Service, 'initializeMap');
    spyOn(d3Service, 'addSVGelement');
    spyOn(d3Service, 'initMapData').and.returnValue(selectedHospitals);
    spyOn(d3Service, 'calculateSVGBounds');
    spyOn(d3Service, 'initCircles');
    spyOn(d3Service, 'initTooltip');
    spyOn(d3Service, 'initZoomableBehaviour');

    d3Service.drawMap();

    tick(100);

    expect(d3Service.hospitals).toEqual(Hospitals);

    expect(d3Service.initializeMap).toHaveBeenCalled();
    expect(d3Service.addSVGelement).toHaveBeenCalled();

    expect(d3Service.initMapData).toHaveBeenCalled();
    expect(d3Service.initMapData).toHaveBeenCalledWith(Hospitals);


    expect(d3Service.calculateSVGBounds).toHaveBeenCalled();
    expect(d3Service.calculateSVGBounds).toHaveBeenCalledWith(selectedHospitals);

    expect(d3Service.initCircles).toHaveBeenCalled();
    expect(d3Service.initCircles).toHaveBeenCalledWith(selectedHospitals);

    expect(d3Service.initTooltip).toHaveBeenCalled();
    expect(d3Service.initZoomableBehaviour).toHaveBeenCalled();
  }));

  it('should draw graph', fakeAsync(() => {
    const modifiedHospitals = [
      new Hospital({
        name: 'Inselspital Bern',
        x: 10,
        y: 46.9477087,
        typ: 'K111',
        yhat: 10,
      }),
      new Hospital({
        name: 'Universitätsspital Basel',
        x: 10,
        y: 47.5610763,
        typ: 'K111',
        yhat: 10,
      })];

    spyOn(d3Service, 'initializeGraph');
    spyOn(d3Service, 'initScatterPlotData');
    spyOn(d3Service, 'scale');
    spyOn(d3Service, 'calculateRegression');
    spyOn(d3Service, 'drawAxes');
    spyOn(d3Service, 'initTooltip');
    spyOn(d3Service, 'drawLegend');
    spyOn(d3Service, 'drawRegressionLine');
    spyOn(d3Service, 'drawDots');

    d3Service.drawGraph();
    d3Service.modifiedHospitals = modifiedHospitals;
    d3Service.correlationCoefficient = 1;

    tick(100);

    expect(d3Service.hospitals).toEqual(Hospitals);

    expect(d3Service.initializeGraph).toHaveBeenCalled();
    expect(d3Service.initScatterPlotData).toHaveBeenCalled();

    expect(d3Service.scale).toHaveBeenCalled();
    expect(d3Service.scale).toHaveBeenCalledWith(modifiedHospitals);

    expect(d3Service.calculateRegression).toHaveBeenCalled();

    expect(d3Service.drawAxes).toHaveBeenCalled();

    expect(d3Service.initTooltip).toHaveBeenCalled();

    expect(d3Service.drawLegend).toHaveBeenCalled();

    expect(d3Service.drawRegressionLine).toHaveBeenCalled();
    expect(d3Service.drawRegressionLine).toHaveBeenCalledWith(modifiedHospitals);

    expect(d3Service.drawDots).toHaveBeenCalled();
    expect(d3Service.drawDots).toHaveBeenCalledWith(modifiedHospitals);

  }));
});
