import { TestBed, inject } from '@angular/core/testing';

import { CharacteristicsService } from './characteristics.service';

describe('CharacteristicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacteristicsService]
    });
  });

  it('should be created', inject([CharacteristicsService], (service: CharacteristicsService) => {
    expect(service).toBeTruthy();
  }));
});
