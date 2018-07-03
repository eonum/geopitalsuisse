import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacteristicsComponent } from './characteristics.component';

import { HospitalService } from '../../services/hospital.service';
import { D3Service } from '../../services/d3.service';

describe('CharacteristicsComponent', () => {
  let component: CharacteristicsComponent;
  let fixture: ComponentFixture<CharacteristicsComponent>;
  let hospitalServiceSpy;
  let d3ServiceSpy;

  beforeEach(async(() => {
    const hospitalSpy = jasmine.createSpyObj('HospitalService', ['getAll']);
    const d3Spy = jasmine.createSpyObj('D3Service',
      ['selectedHospital$', 'currentCategoricalAttribute$', 'currentNumericalAttribute$']);

    TestBed.configureTestingModule({
      declarations: [ CharacteristicsComponent ],
      providers: [
        {provide: HospitalService, useValue: hospitalSpy},
        {provide: D3Service, useValue: d3Spy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacteristicsComponent);
    component = fixture.componentInstance;
    hospitalServiceSpy = TestBed.get(HospitalService);
    d3ServiceSpy = TestBed.get(D3Service);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
