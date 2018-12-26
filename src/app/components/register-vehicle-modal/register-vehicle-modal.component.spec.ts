import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVehicleModalComponent } from './register-vehicle-modal.component';

describe('RegisterVehicleModalComponent', () => {
  let component: RegisterVehicleModalComponent;
  let fixture: ComponentFixture<RegisterVehicleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterVehicleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
