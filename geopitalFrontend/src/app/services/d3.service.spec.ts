import { TestBed, inject } from '@angular/core/testing';

import { D3Service } from './d3.service';
import { CharacteristicsService } from './characteristics.service';

describe('D3Service', () => {
  let characteristicsServiceSpy;

  beforeEach(() => {
    const characteristicsSpy = jasmine.createSpyObj('CharacteristicsService',
      ['isCategoricalAttribute', 'isNumericalAttribute']);

    TestBed.configureTestingModule({
      providers: [
        D3Service,
        { provide: CharacteristicsService, useValue: characteristicsSpy }
      ],
    });

    characteristicsServiceSpy = TestBed.get(CharacteristicsService);
  });

  it('should be created', inject([D3Service], (service: D3Service) => {
    expect(service).toBeTruthy();
  }));
});
