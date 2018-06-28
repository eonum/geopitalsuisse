import { TestBed, inject } from '@angular/core/testing';

import { D3MapsService } from './d3-maps.service';

describe('D3MapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D3MapsService]
    });
  });

  it('should be created', inject([D3MapsService], (service: D3MapsService) => {
    expect(service).toBeTruthy();
  }));
});
