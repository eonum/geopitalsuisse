import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';

import { MenuPopoverComponent } from './menu-popover.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MenuPopoverComponent', () => {
  let component: MenuPopoverComponent;
  let fixture: ComponentFixture<MenuPopoverComponent>;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuPopoverComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(MenuPopoverComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      translate = TestBed.get(TranslateService);
    });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
