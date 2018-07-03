import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { D3Service } from '../../services/d3.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let d3ServiceSpy;

  beforeEach(async(() => {
    const d3Spy = jasmine.createSpyObj('D3Servce', ['updateSelectedHospitalTypes']);

    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        { provide: D3Service, useValue: d3Spy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    d3ServiceSpy = TestBed.get(D3Service);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectHospitalType function if checkbox is selected', async(() => {
    fixture.detectChanges();

    spyOn(component, 'selectHospitalType');

    let link = fixture.debugElement.nativeElement.querySelector('input');
    link.click();

    fixture.whenStable().then(() => {
      expect(component.selectHospitalType).toHaveBeenCalled();
    });

  }));
});
