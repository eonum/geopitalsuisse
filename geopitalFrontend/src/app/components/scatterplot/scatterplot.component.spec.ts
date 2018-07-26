import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterplotComponent } from './scatterplot.component';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';

@Component({selector: 'app-navbar', template: ''})
class NavbarStubComponent {}

@Component({selector: 'app-dropdown', template: ''})
class DropdownStubComponent {}


describe('ScatterplotComponent', () => {
  let component: ScatterplotComponent;
  let fixture: ComponentFixture<ScatterplotComponent>;

  beforeEach(async(() => {
    const characteristicsServiceSpy = jasmine.createSpyObj('CharacteristicsService', ['getNumericalAttributes']);
    const d3ServiceSpy = jasmine.createSpyObj('D3Service', ['drawGraph']);

    TestBed.configureTestingModule({
      declarations: [
        ScatterplotComponent,
        NavbarStubComponent,
        DropdownStubComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: CharacteristicsService, useValue: characteristicsServiceSpy },
        { provide: D3Service, useValue: d3ServiceSpy}
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ScatterplotComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
