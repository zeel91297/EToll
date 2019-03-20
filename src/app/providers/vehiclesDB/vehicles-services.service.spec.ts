import { TestBed } from '@angular/core/testing';

import { VehiclesServicesService } from './vehicles-services.service';

describe('VehiclesServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehiclesServicesService = TestBed.get(VehiclesServicesService);
    expect(service).toBeTruthy();
  });
});
