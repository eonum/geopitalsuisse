import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { StringAttributes } from '../../../mocks/data/mock-string-attributes';
import { Attribute } from '../../models/attribute.model';
import { D3Service } from '../../services/d3.service';
import { CharacteristicsService } from '../../services/characteristics.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let d3ServiceSpy;
  let characteristicsServiceSpy;
  let hospitalMainTypes: Attribute;

  beforeEach(async(() => {
    d3ServiceSpy = jasmine.createSpyObj('D3Service', ['updateSelectedHospitalTypes']);

    characteristicsServiceSpy = jasmine.createSpyObj('CharacteristicsService', ['getAttributeByName']);
    characteristicsServiceSpy.getAttributeByName.and.returnValue(
      of(StringAttributes.filter(attr => attr.code === 'geopital_main_type')[0]));

    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      providers: [
        { provide: D3Service, useValue: d3ServiceSpy },
        { provide: CharacteristicsService, useValue: characteristicsServiceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      d3ServiceSpy = TestBed.get(D3Service);
      characteristicsServiceSpy = TestBed.get(CharacteristicsService);
    });
  }));

  beforeEach(() => {
    hospitalMainTypes = StringAttributes.filter(attr => attr.code === 'geopital_main_type')[0];
    component.hospitalMainTypes = hospitalMainTypes;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hospital main types should be defined', () => {
    expect(component.hospitalMainTypes).toBeDefined();
  });

  it('no hospital main types after createComponent()', () => {
    expect(fixture.debugElement.queryAll(By.css('.checkbox')).length).toBe(0);
  });

  it('should display all hospital main types after detectChanges', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.checkbox')).length).toBe(hospitalMainTypes.values_de.length);
  });


  it('should call \'selectHospitalType\' if checkbox is selected', () => {
    spyOn(component, 'selectHospitalType');
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('.checkbox').click();

    expect(component.selectHospitalType).toHaveBeenCalled();
  });

  it('should select correct hospital types', () => {
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('#U').click();
    fixture.debugElement.nativeElement.querySelector('#P').click();

    component.selectHospitalType();

    expect(d3ServiceSpy.updateSelectedHospitalTypes).toHaveBeenCalled();
    expect(d3ServiceSpy.updateSelectedHospitalTypes).toHaveBeenCalledWith(['U', 'P']);
  });

  it('should deselect hospital type if clicked twice', () => {
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('#U').click();
    fixture.debugElement.nativeElement.querySelector('#P').click();
    fixture.debugElement.nativeElement.querySelector('#P').click();

    component.selectHospitalType();

    expect(d3ServiceSpy.updateSelectedHospitalTypes).toHaveBeenCalled();
    expect(d3ServiceSpy.updateSelectedHospitalTypes).toHaveBeenCalledWith(['U']);
  });
});
