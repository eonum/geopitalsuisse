import { TestBed, inject } from '@angular/core/testing';

import { LanguageGuardService } from './language-guard.service';

describe('LanguageGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageGuardService]
    });
  });

  it('should be created', inject([LanguageGuardService], (service: LanguageGuardService) => {
    expect(service).toBeTruthy();
  }));
});
