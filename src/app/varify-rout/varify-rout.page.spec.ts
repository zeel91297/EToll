import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarifyRoutPage } from './varify-rout.page';

describe('VarifyRoutPage', () => {
  let component: VarifyRoutPage;
  let fixture: ComponentFixture<VarifyRoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarifyRoutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarifyRoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
