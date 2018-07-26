import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { HttpLoaderFactory } from '../../app.module';
import { CharacteristicsComponent } from './characteristics.component';
import { VariableService } from '../../services/variable.service';
import { NumericalAttributes } from '../../../mocks/data/mock-numerical-attributes';
import { StringAttributes } from '../../../mocks/data/mock-string-attributes';
import { Hospitals } from '../../../mocks/data/mock-hospitals';

describe('CharacteristicsComponent', () => {
  let component: CharacteristicsComponent;
  let fixture: ComponentFixture<CharacteristicsComponent>;
  let variableService: VariableService;
  let translate: TranslateService;

  beforeEach(async(() => {
    variableService = jasmine.createSpyObj('VariableService',
      ['getVariableOfHospitalByAttribute', 'getValueOfVariable']);

    TestBed.configureTestingModule({
      declarations: [ CharacteristicsComponent ],
      providers: [
        TranslateService,
        {provide: VariableService, useValue: variableService},
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
      fixture = TestBed.createComponent(CharacteristicsComponent);
      component = fixture.componentInstance;
      variableService = TestBed.get(VariableService);
      translate = TestBed.get(TranslateService);
    });
  }));

  beforeEach(() => {
    component.categoricalAttribute = StringAttributes[0];
    component.numericalAttribute = NumericalAttributes[0];
    component.hospital = Hospitals[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
