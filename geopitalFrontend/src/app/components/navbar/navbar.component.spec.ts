import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { HospitalService } from "../../services/hospital.service";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [{ provide: HospitalService}]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectHospitalType function if checkbox is selected', async(() => {
    spyOn(component, 'selectHospitalType');
    let link = fixture.debugElement.nativeElement.querySelector('input');
    link.click();

    fixture.whenStable().then(() => {
      expect(component.selectHospitalType).toHaveBeenCalled();
    })
  }));
});
