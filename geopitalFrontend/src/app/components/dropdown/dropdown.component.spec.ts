import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { HttpLoaderFactory } from '../../app.module';
import { DropdownComponent } from './dropdown.component';
import { CharacteristicsService } from '../../services/characteristics.service';
import { D3Service } from '../../services/d3.service';
import { NumericalAttributes } from '../../../mocks/data/mock-numerical-attributes';

const TRANSLATIONS_DE = require('../../../assets/i18n/de.json');
const TRANSLATIONS_FR = require('../../../assets/i18n/fr.json');


describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    const d3ServiceSpy = jasmine.createSpyObj('D3Service',
      ['showMap', 'setCategoricalAttribute', 'setNumericalAttribute',
        'setXCoordinateAttribute', 'setYCoordinateAttribute', 'updateAttribute']);
    const characteristicsServiceSpy = jasmine.createSpyObj('CharacteristicsService',
      ['isCategoricalAttribute', 'isNumericalAttribute']);

    TestBed.configureTestingModule({
      declarations: [
        DropdownComponent,
      ],
      providers: [
        {provide: CharacteristicsService, useValue: characteristicsServiceSpy},
        {provide: D3Service, useValue: d3ServiceSpy}
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
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DropdownComponent);
      component = fixture.componentInstance;
      translate = TestBed.get(TranslateService);

      http = TestBed.get(HttpTestingController);
    });
  }));

  beforeEach(() => {
    component.input = false;
    component.selectedAttribute = NumericalAttributes[0];
    component.attributes = NumericalAttributes;
    component.axis = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have dropdown after detectChanges()', () => {
    translate.use('de');

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#attributeDropdownButton')).nativeElement.textContent)
      .toBe('Anzahl Standorte');
    expect(component.attributes).toEqual(NumericalAttributes);
    expect(component.attributes.length).toBe(3);
    expect(fixture.debugElement.queryAll(By.css('.dropdown-item')).length).toBe(3);
  });

  describe('should be german', () => {
    beforeEach(() => {
      translate.use('de');

      component.locale = 'de';
      component.name = 'Filter';

      http.expectOne('/assets/i18n/de.json').flush(TRANSLATIONS_DE);
      http.expectNone('/assets/i18n/fr.json');
      http.verify();
    });

    it('should have correct title', () => {
      expect(fixture.nativeElement.querySelector('h6').textContent).toEqual('');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('h6').textContent).toEqual(TRANSLATIONS_DE.filter);
    });
  });

  describe('should be french', () => {
    beforeEach(() => {
      component.locale = 'fr';
      component.name = 'Filtre';

      translate.use('fr');
      http.expectOne('/assets/i18n/fr.json').flush(TRANSLATIONS_FR);
      http.expectNone('/assets/i18n/de.json');

      http.verify();
    });

    it('should have correct title', () => {
      expect(fixture.nativeElement.querySelector('h6').textContent).toEqual('');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('h6').textContent).toEqual(TRANSLATIONS_FR.filter);
    });
  });

  describe('should switch languages correctly', () => {

    it('should switch from german to french', () => {
      // start with german
      translate.use('de');
      component.name = 'Filter';

      http.expectOne('/assets/i18n/de.json').flush(TRANSLATIONS_DE);
      http.expectNone('/assets/i18n/fr.json');
      http.verify();

      fixture.detectChanges();

      expect(component.locale).toBe('de');
      expect(fixture.nativeElement.querySelector('h6').textContent).toEqual(TRANSLATIONS_DE.filter);

      // switch to french
      translate.use('fr');
      component.name = 'Filtre';

      http.expectOne('/assets/i18n/fr.json').flush(TRANSLATIONS_FR);
      http.verify();

      fixture.detectChanges();

      expect(component.locale).toBe('fr');
      expect(fixture.nativeElement.querySelector('h6').textContent).toEqual(TRANSLATIONS_FR.filter);
    });

    it('should switch from french to german', () => {
      // start with french
      translate.use('fr');
      component.name = 'Filtre';

      http.expectOne('/assets/i18n/fr.json').flush(TRANSLATIONS_FR);
      http.expectNone('/assets/i18n/de.json');
      http.verify();

      fixture.detectChanges();

      expect(component.locale).toBe('fr');
      expect(fixture.nativeElement.querySelector('h6').textContent).toEqual(TRANSLATIONS_FR.filter);

      // switch language to german
      translate.use('de');
      component.name = 'Filter';

      http.expectOne('/assets/i18n/de.json').flush(TRANSLATIONS_DE);
      http.verify();

      fixture.detectChanges();

      expect(component.locale).toBe('de');
      expect(fixture.nativeElement.querySelector('h6').textContent).toEqual(TRANSLATIONS_DE.filter);
    });
  });
});
