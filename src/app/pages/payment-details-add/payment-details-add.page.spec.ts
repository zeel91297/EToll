import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailsAddPage } from './payment-details-add.page';

describe('PaymentDetailsAddPage', () => {
  let component: PaymentDetailsAddPage;
  let fixture: ComponentFixture<PaymentDetailsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDetailsAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
