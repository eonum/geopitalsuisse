import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { HttpLoaderFactory } from '../app.module';

import { LanguageGuard } from './language-guard.service';

describe('LanguageGuard', () => {
  let languageGuard: LanguageGuard;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LanguageGuard
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
      ]
    });

    languageGuard = TestBed.get(LanguageGuard);
    translate = TestBed.get(TranslateService);
  });

  it('should be created', () => {
    expect(languageGuard).toBeTruthy();
  });
});
