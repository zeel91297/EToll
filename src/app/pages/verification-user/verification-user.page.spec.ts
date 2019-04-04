import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationUserPage } from './verification-user.page';

describe('VerificationUserPage', () => {
  let component: VerificationUserPage;
  let fixture: ComponentFixture<VerificationUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
