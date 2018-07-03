import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MapsComponent } from './maps.component';
import { HospitalService } from '../../services/hospital.service';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';

@Component({selector: 'app-sidebar', template: ''})
class SidebarComponentStubComponent {}

const mockNumAttribute = {
  category: 'number',
  code: 'EtMedL',
  nameDE: 'Ertrag aus medizinischen Leistungen und Pflege',
  nameFR: 'Produits des hospitalisations et soins',
  nameIT: 'Ricavi per degenze e cure'
};

const mockCatAttribute = {
  category: 'string',
  code: 'RForm',
  nameDE: 'Rechtsform',
  nameFR: 'Forme juridique',
  nameIT: 'Forma giuridica'
};

const mockHospital = {
  name: 'Test',
  streetAndNumber: '',
  zipCodeAndCity: '',
  latitude: '',
  longitude: '',
  hospital_attributes: null
};


describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  let d3Service;
  let hospitalService;
  let characteristicsService;

  beforeEach(async(() => {
    const d3Spy = jasmine.createSpyObj('D3Service', ['drawMap']);

    TestBed.configureTestingModule({
      declarations: [
        MapsComponent,
        SidebarComponentStubComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        HospitalService,
        { provide: D3Service, useValue: d3Spy},
        CharacteristicsService,
        HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    d3Service = TestBed.get(D3Service);
    hospitalService = fixture.debugElement.injector.get(HospitalService);
    characteristicsService = fixture.debugElement.injector.get(CharacteristicsService);

    spyOn(characteristicsService, 'getNumericalAttributes').and.returnValue(of(mockNumAttribute));
    spyOn(characteristicsService, 'getCategoricalAttributes').and.returnValue(of(mockCatAttribute));
    spyOn(hospitalService, 'getAll').and.returnValue(of(mockHospital));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call services', () => {
    component.ngOnInit();
    expect(characteristicsService.getNumericalAttributes).toHaveBeenCalled();
    expect(characteristicsService.getCategoricalAttributes).toHaveBeenCalled();
    expect(hospitalService.getAll).toHaveBeenCalled();
  });

});
