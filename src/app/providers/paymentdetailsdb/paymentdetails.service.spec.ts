import { TestBed } from '@angular/core/testing';

import { PaymentdetailsService } from './paymentdetails.service';

describe('PaymentdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentdetailsService = TestBed.get(PaymentdetailsService);
    expect(service).toBeTruthy();
  });
});
