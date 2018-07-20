import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorialAttributesComponent } from './categorial-attributes.component';
import { D3Service } from '../../services/d3.service';

describe('CategorialAttributesComponent', () => {
  let component: CategorialAttributesComponent;
  let fixture: ComponentFixture<CategorialAttributesComponent>;
  let d3ServiceSpy;
  let attribute;

  beforeEach(async(() => {
    const d3Spy = jasmine.createSpyObj('D3Service', ['updateSelectedCategoryOption']);
    TestBed.configureTestingModule({
      declarations: [
        CategorialAttributesComponent
      ],
      providers: [
        {provide: D3Service, useValue: d3Spy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorialAttributesComponent);
    component = fixture.componentInstance;
    d3ServiceSpy = TestBed.get(D3Service);
  });

  beforeEach(() => {
    attribute = {
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

    component.attribute = attribute;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
