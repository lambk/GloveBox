import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVehicleFormComponent } from './register-vehicle-form.component';

describe('RegisterVehicleFormComponent', () => {
  let component: RegisterVehicleFormComponent;
  let fixture: ComponentFixture<RegisterVehicleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterVehicleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
