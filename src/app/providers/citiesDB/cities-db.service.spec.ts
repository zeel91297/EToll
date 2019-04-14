import { TestBed } from '@angular/core/testing';

import { CitiesDbService } from './cities-db.service';

describe('CitiesDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitiesDbService = TestBed.get(CitiesDbService);
    expect(service).toBeTruthy();
  });
});
