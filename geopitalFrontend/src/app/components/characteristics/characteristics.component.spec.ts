import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicsComponent } from './characteristics.component';
import { VariableService } from '../../services/variable.service';
import { NumericalAttributes } from '../../../mocks/data/mock-numerical-attributes';
import { StringAttributes } from '../../../mocks/data/mock-string-attributes';

describe('CharacteristicsComponent', () => {
  let component: CharacteristicsComponent;
  let fixture: ComponentFixture<CharacteristicsComponent>;
  let variableServiceSpy;
  const hospital;

  beforeEach(async(() => {
    const variableSpy = jasmine.createSpyObj('VariableService',
      ['getVariableOfHospitalByAttribute', 'getValueOfVariable']);

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
    component.categoricalAttribute = StringAttributes[0];
    component.numericalAttribute = NumericalAttributes[0];
    component.hospital = hospital;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
