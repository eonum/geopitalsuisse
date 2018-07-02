import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/of';

import { MapsComponent } from './maps.component';
import { HospitalService } from '../../services/hospital.service';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Component({selector: 'app-sidebar', template: ''})
class SidebarComponentStubComponent {}

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  let d3ServiceSpy;
  let hospitalServiceSpy;
  let characteristicsService;

  beforeEach(async(() => {
    const d3Spy = jasmine.createSpyObj('D3Service', ['drawMap']);
    const hospitalSpy = jasmine.createSpyObj('HospitalService', ['getAll']);

    TestBed.configureTestingModule({
      declarations: [
        MapsComponent,
        SidebarComponentStubComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: D3Service, useValue: d3Spy},
        { provide: HospitalService, useValue: hospitalSpy},
        CharacteristicsService,
        HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    d3ServiceSpy = TestBed.get(D3Service);
    hospitalServiceSpy = TestBed.get(HospitalService);
    characteristicsService = TestBed.get(CharacteristicsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call services', () => {
    spyOn(characteristicsService, 'getNumericalAttributes').and.returnValue(Observable.of({
      category: 'number',
      code: 'EtMedL',
      nameDE: 'Ertrag aus medizinischen Leistungen und Pflege',
      nameFR: 'Produits des hospitalisations et soins',
      nameIT: 'Ricavi per degenze e cure'
    }));

    spyOn(characteristicsService, 'getCategoricalAttributes').and.returnValue(Observable.of({
      category: 'string',
      code: 'RForm',
      nameDE: 'Rechtsform',
      nameFR: 'Forme juridique',
      nameIT: 'Forma giuridica'
    }));

    component.ngOnInit();
    expect(characteristicsService.getNumericalAttributes).toHaveBeenCalled();
    expect(characteristicsService.getCategoricalAttributes).toHaveBeenCalled();

  });

});
