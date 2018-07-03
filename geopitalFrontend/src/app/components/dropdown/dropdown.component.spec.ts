import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DropdownComponent } from './dropdown.component';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';
import { Attribute } from '../../models/attribute.model';

const ATTRIBUTE_STRING = [new Attribute('KT', 'string', 'Kanton', 'Cantone', 'Cantone')];
const ATTRIBUTE_NUMERIC = [new Attribute('Gebs', 'number', 'Gebärsäle', 'Gebärsäle', 'sale parto'), new Attribute('Ops', 'number', 'Operationssäle', 'salles d’opération', 'Sale operatorie')];


describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let characteristicsServiceSpy;
  let d3ServiceSpy;
  let attributes;

  beforeEach(async(() => {
    const d3Spy = jasmine.createSpyObj('D3Service',
      ['showMap', 'setCurrentCategoricalAttribute', 'setCurrentNumericalAttribute', 'updateAttribute']);
    const characteristicsSpy = jasmine.createSpyObj('CharacteristicsService',
      ['getNumericalAttributes', 'isCategoricalAttribute', 'isNumericalAttribute']);

    TestBed.configureTestingModule({
      declarations: [
        DropdownComponent,
      ],
      providers: [
        {provide: CharacteristicsService, useValue: characteristicsSpy},
        {provide: D3Service, useValue: d3Spy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    characteristicsServiceSpy = TestBed.get(CharacteristicsService);
    d3ServiceSpy = TestBed.get(D3Service);
  });

  beforeEach(() => {
    attributes = [
      {
        category: 'number',
        code: 'AnzStand',
        nameDE: 'Anzahl Standorte',
        nameFR: 'Nombre de sites',
        nameIT: 'Numero di sedi'
      },
      {
        category: 'number',
        code: 'EtMedL',
        nameDE: 'Ertrag aus medizinischen Leistungen und Pflege',
        nameFR: 'Produits des hospitalisations et soins',
        nameIT: 'Ricavi per degenze e cure'
      }
    ];

    component.input = false;
    component.selectedAttribute = attributes[0];
    component.attributes = attributes;
    component.name = 'Test';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct input bindings', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h6').textContent).toEqual('Test');
    expect(fixture.debugElement.query(By.css('#attributeDropdownButton')).nativeElement.textContent).toBe('Anzahl Standorte');
    expect(component.attributes).toEqual(attributes);
    expect(component.attributes.length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('.dropdown-item')).length).toBe(2);
  });

});
