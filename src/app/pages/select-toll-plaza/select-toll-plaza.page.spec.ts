import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTollPlazaPage } from './select-toll-plaza.page';

describe('SelectTollPlazaPage', () => {
  let component: SelectTollPlazaPage;
  let fixture: ComponentFixture<SelectTollPlazaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTollPlazaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTollPlazaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
