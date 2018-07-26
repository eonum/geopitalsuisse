import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { HttpLoaderFactory } from '../../app.module';
import { CategorialAttributesComponent } from './categorial-attributes.component';
import { D3Service } from '../../services/d3.service';
import { NumericalAttributes } from '../../../mocks/data/mock-numerical-attributes';

describe('CategorialAttributesComponent', () => {
  let component: CategorialAttributesComponent;
  let fixture: ComponentFixture<CategorialAttributesComponent>;
  let translate: TranslateService;

  beforeEach(async(() => {
    const d3ServiceSpy = jasmine.createSpyObj('D3Service', ['updateSelectedCategoryOption']);
    TestBed.configureTestingModule({
      declarations: [
        CategorialAttributesComponent
      ],
      providers: [
        TranslateService,
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
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CategorialAttributesComponent);
      component = fixture.componentInstance;
      translate = TestBed.get(TranslateService);
    });
  }));

  beforeEach(() => {
    component.attribute = NumericalAttributes[0];
    translate.use('de');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
