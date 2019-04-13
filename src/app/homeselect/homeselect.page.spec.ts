import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeselectPage } from './homeselect.page';

describe('HomeselectPage', () => {
  let component: HomeselectPage;
  let fixture: ComponentFixture<HomeselectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeselectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeselectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
