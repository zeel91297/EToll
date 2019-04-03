import { TestBed } from '@angular/core/testing';

import { TollplazaService } from './tollplaza.service';

describe('TollplazaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TollplazaService = TestBed.get(TollplazaService);
    expect(service).toBeTruthy();
  });
});
