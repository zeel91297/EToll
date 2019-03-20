import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransectionStatusPage } from './transection-status.page';

describe('TransectionStatusPage', () => {
  let component: TransectionStatusPage;
  let fixture: ComponentFixture<TransectionStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransectionStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransectionStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
