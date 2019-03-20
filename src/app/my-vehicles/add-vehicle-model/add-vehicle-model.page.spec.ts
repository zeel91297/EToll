import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleModelPage } from './add-vehicle-model.page';

describe('AddVehicleModelPage', () => {
  let component: AddVehicleModelPage;
  let fixture: ComponentFixture<AddVehicleModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVehicleModelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehicleModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
