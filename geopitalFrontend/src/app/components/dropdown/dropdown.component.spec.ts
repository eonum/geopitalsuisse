import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DropdownComponent } from './dropdown.component';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';
import { Attribute } from '../../models/attribute.model';


describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let characteristicsServiceSpy;
  let d3ServiceSpy;
  let attributes: Array<Attribute> = [];
  let selectedAttribute: Attribute;

  beforeEach(async(() => {
    const d3Spy = jasmine.createSpyObj('D3Service',
      ['showMap', 'setCategoricalAttribute', 'setNumericalAttribute', 'setXCoordinateAttribute', 'setYCoordinateAttribute', 'updateAttribute']);
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
    selectedAttribute = {
      code: 'Akt',
      variable_type: 'string',
      values: ['A','P','R','B'],
      values_de: ['Akutsomatik','Psychiatrie','Rehabilitation','Geburtshäuser'],
      values_fr: ['soins aiguë','psychiatrie','Réhabilitation','maison de naissance'],
      values_it: [],
      variable_sets: ['kzp','geopital_test'],
      name_de: 'Aktivitätstyp',
      name_fr: 'Type d‘activité',
      name_it: 'Tipo di attività'
    };

    attributes.push(selectedAttribute);

    component.input = false;
    component.selectedAttribute = selectedAttribute;
    component.attributes = attributes;
    component.name = 'Test';
    component.axis = null;
  });

  afterEach(() => {
    attributes = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct input bindings', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h6').textContent).toEqual('Test');
    expect(fixture.debugElement.query(By.css('#attributeDropdownButton')).nativeElement.textContent).toBe('Aktivitätstyp');
    expect(component.attributes).toEqual(attributes);
    expect(component.attributes.length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.dropdown-item')).length).toBe(1);
  });

});
