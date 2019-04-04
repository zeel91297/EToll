import { TestBed } from '@angular/core/testing';

import { ConfirmpaymentService } from './confirmpayment.service';

describe('ConfirmpaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmpaymentService = TestBed.get(ConfirmpaymentService);
    expect(service).toBeTruthy();
  });
});
