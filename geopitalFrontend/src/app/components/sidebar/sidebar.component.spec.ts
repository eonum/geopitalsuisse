import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';

@Component({selector: 'app-navbar', template: ''})
class NavbarStubComponent {}

@Component({selector: 'app-dropdown', template: ''})
class DropdownStubComponent {}

@Component({selector: 'app-categorial-attributes', template: ''})
class CategoricalAttributesStubComponent {}

@Component({selector: 'app-characteristics', template: ''})
class CharacteristicsStubComponent {}


describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let characteristicsService: CharacteristicsService;
  let d3Service: D3Service;

  beforeEach(async(() => {
    characteristicsService = jasmine.createSpyObj('CharacteristicsService',
      ['getStringAttributes', 'getNumberAttributes']);

    d3Service = jasmine.createSpyObj('D3Service',
      ['selectedHospital$', 'categoricalAttribute$', 'numericalAttribute$']);

    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        NavbarStubComponent,
        DropdownStubComponent,
        CategoricalAttributesStubComponent,
        CharacteristicsStubComponent
      ],
      providers: [
        { provide: D3Service, useValue: d3Service },
        { provide: CharacteristicsService, useValue: characteristicsService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(SidebarComponent);
      component = fixture.componentInstance;
      characteristicsService = TestBed.get(CharacteristicsService);
      d3Service = TestBed.get(D3Service);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
