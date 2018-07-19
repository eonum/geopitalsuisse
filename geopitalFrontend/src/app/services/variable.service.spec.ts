import { TestBed, inject } from '@angular/core/testing';

import { VariableService } from './variable.service';

describe('VariableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariableService]
    });
  });

  it('should be created', inject([VariableService], (service: VariableService) => {
    expect(service).toBeTruthy();
  }));
});
