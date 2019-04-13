import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFailedPage } from './transaction-failed.page';

describe('TransactionFailedPage', () => {
  let component: TransactionFailedPage;
  let fixture: ComponentFixture<TransactionFailedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFailedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
