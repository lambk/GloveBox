import { Subject } from 'rxjs';
import { VehicleService } from './../../services/vehicle/vehicle.service';
import { AlertComponent } from './../alert/alert.component';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVehicleFormComponent } from './register-vehicle-form.component';

describe('RegisterVehicleFormComponent', () => {
  let component: RegisterVehicleFormComponent;
  let fixture: ComponentFixture<RegisterVehicleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(RegisterVehicleFormComponent);
    component = fixture.componentInstance;
    component.registerSubject = new Subject<any>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
