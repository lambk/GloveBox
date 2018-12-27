import { VehicleService } from './../../services/vehicle/vehicle.service';
import { AlertComponent } from './../alert/alert.component';
import { FormsModule } from '@angular/forms';
import { RegisterVehicleFormComponent } from './../register-vehicle-form/register-vehicle-form.component';
import { Subject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVehicleModalComponent } from './register-vehicle-modal.component';

describe('RegisterVehicleModalComponent', () => {
  let component: RegisterVehicleModalComponent;
  let fixture: ComponentFixture<RegisterVehicleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterVehicleModalComponent,
        RegisterVehicleFormComponent,
        AlertComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: VehicleService, useClass: jasmine.createSpy() }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVehicleModalComponent);
    component = fixture.componentInstance;
    component.registerSubject = new Subject<any>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
