import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DropdownComponent } from './dropdown.component';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';

import { NumericalAttributes } from '../../../mocks/data/mock-numerical-attributes';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let characteristicsServiceSpy;
  let d3ServiceSpy;

  beforeEach(async(() => {
    const d3Spy = jasmine.createSpyObj('D3Service',
      ['showMap', 'setCategoricalAttribute', 'setNumericalAttribute',
        'setXCoordinateAttribute', 'setYCoordinateAttribute', 'updateAttribute']);
    const characteristicsSpy = jasmine.createSpyObj('CharacteristicsService',
      ['isCategoricalAttribute', 'isNumericalAttribute']);

    TestBed.configureTestingModule({
      declarations: [
        DropdownComponent,
      ],
      providers: [
        {provide: CharacteristicsService, useValue: characteristicsSpy},
        {provide: D3Service, useValue: d3Spy}
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DropdownComponent);
      component = fixture.componentInstance;
      characteristicsServiceSpy = TestBed.get(CharacteristicsService);
      d3ServiceSpy = TestBed.get(D3Service);
    });
  }));

  beforeEach(() => {
    component.input = false;
    component.selectedAttribute = NumericalAttributes[0];
    component.attributes = NumericalAttributes;
    component.name = 'Test';
    component.axis = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct input bindings', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h6').textContent).toEqual('Test');
    expect(fixture.debugElement.query(By.css('#attributeDropdownButton')).nativeElement.textContent)
      .toBe('Anzahl Standorte');
    expect(component.attributes).toEqual(NumericalAttributes);
    expect(component.attributes.length).toBe(3);
    expect(fixture.debugElement.queryAll(By.css('.dropdown-item')).length).toBe(3);
  });

});
