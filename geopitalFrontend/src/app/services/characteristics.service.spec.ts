import { TestBed, inject } from '@angular/core/testing';
import { CharacteristicsService } from './characteristics.service';
import { HttpClient } from "@angular/common/http";

describe('CharacteristicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacteristicsService,
        HttpClient]
    });
  });

  it('should be created', inject([CharacteristicsService], (service: CharacteristicsService) => {
    expect(service).toBeTruthy();
  }));
});
