import { Observable } from 'rxjs';
import { VehicleService } from './../../services/vehicle/vehicle.service';
import { PaginationComponent } from './../pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './../alert/alert.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageComponent } from './garage.component';
import { RegisterVehicleModalComponent } from '../register-vehicle-modal/register-vehicle-modal.component';
import { RangePipe } from 'src/app/util/range-pipe';
import { RegisterVehicleFormComponent } from '../register-vehicle-form/register-vehicle-form.component';

const spy = jasmine.createSpyObj('vehicleService', {
  getAll: new Observable()
});

describe('GarageComponent', () => {
  let component: GarageComponent;
  let fixture: ComponentFixture<GarageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GarageComponent,
        AlertComponent,
        PaginationComponent,
        RegisterVehicleModalComponent,
        RegisterVehicleFormComponent,
        RangePipe
      ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: VehicleService, useValue: spy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
