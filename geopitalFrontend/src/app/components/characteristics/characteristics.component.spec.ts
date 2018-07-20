import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicsComponent } from './characteristics.component';

import { VariableService } from '../../services/variable.service';
describe('CharacteristicsComponent', () => {
  let component: CharacteristicsComponent;
  let fixture: ComponentFixture<CharacteristicsComponent>;
  let variableServiceSpy;
  let hospital;
  let categoricalAttribute;
  let numericalAttribute;

  beforeEach(async(() => {
    const variableSpy = jasmine.createSpyObj('VariableService', ['getVariableOfHospitalByAttribute', 'getValueOfVariable']);

    TestBed.configureTestingModule({
      declarations: [ CharacteristicsComponent ],
      providers: [
        {provide: VariableService, useValue: variableSpy},
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(CharacteristicsComponent);
      component = fixture.componentInstance;
      variableServiceSpy = TestBed.get(VariableService);
    });
  }));

  beforeEach(() => {
    categoricalAttribute = {
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

    numericalAttribute = {
      code: 'EtMedL',
      variable_type: 'number',
      values: [],
      values_de: [],
      values_fr: [],
      values_it: [],
      variable_sets: ['kzp','geopital_test'],
      name_de: 'Ertrag aus medizinischen Leistungen und Pflege',
      name_fr: 'Produits des hospitalisations et soins',
      name_it: 'Ricavi per degenze e cure'
    };

    hospital = {
      name:"Inselspital Bern",
      address:"Freiburgstrasse 18,3010 Bern",
      location:[7.4255497,46.9477087],
      latitude:46.9477087,
      longitude:7.4255497,
      typ:"K111",
      typ_aggregated:"U",
      variables:[
        {Akt: {
          value: "A, R",
          years: {2013: "A, R", 2012:"A, R", 2011: "A, R", 2014: "A, R", 2015: "A, R"}}},
        {EtMedL: {
          value: "1104189684",
          years: {2013: "1047425290", 2012:"993677887", 2011: "926734801", 2014: "1105276704", 2015: "1104189684"}}}
      ]
    };

    component.categoricalAttribute = categoricalAttribute;
    component.numericalAttribute = numericalAttribute;
    component.hospital = hospital;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
