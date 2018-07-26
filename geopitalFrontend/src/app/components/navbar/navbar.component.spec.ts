import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { HttpLoaderFactory } from '../../app.module';
import { NavbarComponent } from './navbar.component';
import { Attribute } from '../../models/attribute.model';
import { D3Service } from '../../services/d3.service';
import { CharacteristicsService } from '../../services/characteristics.service';
import { StringAttributes } from '../../../mocks/data/mock-string-attributes';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let translate: TranslateService;
  let d3Service: D3Service;
  let characteristicsService: CharacteristicsService;
  let hospitalMainTypes: Attribute;

  beforeEach(async(() => {
    d3Service = jasmine.createSpyObj('D3Service', ['updateSelectedHospitalTypes']);

    characteristicsService = jasmine.createSpyObj('CharacteristicsService', ['getAttributeByName']);
    characteristicsService.getAttributeByName.and.returnValue(
      of(StringAttributes.filter(attr => attr.code === 'geopital_main_type')[0]));

    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      providers: [
        { provide: D3Service, useValue: d3Service },
        { provide: CharacteristicsService, useValue: characteristicsService }
      ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      d3Service = TestBed.get(D3Service);
      characteristicsService = TestBed.get(CharacteristicsService);
      translate = TestBed.get(TranslateService);
    });
  }));

  beforeEach(() => {
    hospitalMainTypes = StringAttributes.filter(attr => attr.code === 'geopital_main_type')[0];
    component.hospitalMainTypes = hospitalMainTypes;
    translate.use('de');
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
    expect(component.hospitalMainTypes).toBeDefined();
    expect(component.locale).toBeDefined();
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

    expect(d3Service.updateSelectedHospitalTypes).toHaveBeenCalled();
    expect(d3Service.updateSelectedHospitalTypes).toHaveBeenCalledWith(['U', 'P']);
  });

  it('should deselect hospital type if clicked twice', () => {
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('#U').click();
    fixture.debugElement.nativeElement.querySelector('#P').click();
    fixture.debugElement.nativeElement.querySelector('#P').click();

    component.selectHospitalType();

    expect(d3Service.updateSelectedHospitalTypes).toHaveBeenCalled();
    expect(d3Service.updateSelectedHospitalTypes).toHaveBeenCalledWith(['U']);
  });
});
