import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { VehicleComponent } from './vehicle.component';
import { By } from '@angular/platform-browser';


const vehicle: Vehicle = {
  id: 1,
  plate: 'ABC123',
  make: 'Toyota',
  model: 'Celica',
  year: 1994,
  odometer: 200000,
  wofExpiry: '03-03-2000',
  countryRegistered: 'New Zealand'
};

const vehicleServiceMockProvider = {
  provide: VehicleService,
  useValue: {
    vehicleUpdateObservable: new Observable(),
    getAll: () => of([vehicle]),
    getOne: () => of(vehicle)
  }
};

describe('VehicleComponent', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({plate: 'ABC123'})
          }
        },
        vehicleServiceMockProvider
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct vehicle details', () => {
    const title = fixture.debugElement.query(By.css('.title-tag'));
    const year = fixture.debugElement.query(By.css('.year-tag'));
    const plate = fixture.debugElement.query(By.css('.plate-tag'));
    
    expect(title.nativeElement.innerText).toContain('Toyota');
    expect(title.nativeElement.innerText).toContain('Celica');
    expect(year.nativeElement.innerText).toEqual('1994');
    expect(plate.nativeElement.innerText).toEqual('ABC123');
  });
});
