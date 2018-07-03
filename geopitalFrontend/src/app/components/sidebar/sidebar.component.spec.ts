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
  let characteristicsServiceSpy;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('CharacteristicsService',
      ['getCategoricalAttributes', 'getNumericalAttributes']);

    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        NavbarStubComponent,
        DropdownStubComponent,
        CategoricalAttributesStubComponent,
        CharacteristicsStubComponent
      ],
      providers: [
        D3Service,
        { provide: CharacteristicsService, useValue: spy }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    characteristicsServiceSpy = TestBed.get(CharacteristicsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
