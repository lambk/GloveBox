import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { RangePipe } from 'src/app/util/range-pipe';
import { GarageTableComponent } from '../garage-table/garage-table.component';
import { RegisterVehicleModalComponent } from '../register-vehicle-modal/register-vehicle-modal.component';
import { VehicleService } from './../../services/vehicle/vehicle.service';
import { AlertComponent } from './../alert/alert.component';
import { PaginationComponent } from './../pagination/pagination.component';
import { GarageComponent } from './garage.component';


const vehicleServiceMockProvider = {
  provide: VehicleService,
  useValue: {
    vehicleUpdateObservable: new Observable(),
    getAll: () => of([])
  }
};

describe('GarageComponent', () => {
  let component: GarageComponent;
  let fixture: ComponentFixture<GarageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GarageComponent,
        MockComponent(GarageTableComponent),
        MockComponent(AlertComponent),
        MockComponent(PaginationComponent),
        MockComponent(RegisterVehicleModalComponent),
        RangePipe
      ],
      imports: [
        FormsModule
      ],
      providers: [
        vehicleServiceMockProvider
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
