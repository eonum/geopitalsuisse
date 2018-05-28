import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacteristicsComponent } from './characteristics.component';
import {HospitalService} from "../../services/hospital.service";

describe('CharacteristicsComponent', () => {
  let component: CharacteristicsComponent;
  let fixture: ComponentFixture<CharacteristicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacteristicsComponent ],
      providers: [{provide: HospitalService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
