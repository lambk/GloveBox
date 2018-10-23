import { VehicleService } from './../../services/vehicle/vehicle.service';
import { SubmitEvent } from './../../constants';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle.model';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

  public vehicles: Vehicle[];
  public registerSubject: Subject<void>;
  public isSubmitting = false;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.registerSubject = new Subject();
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.getAll().subscribe((res) => this.vehicles = res,
      (err) => console.log(err));
  }

  onRegisterClick() {
    this.registerSubject.next();
  }

  onSubmitEvent(event: SubmitEvent) {
    if (event === SubmitEvent.START) {
      this.isSubmitting = true;
    } else {
      this.isSubmitting = false;
    }
  }

  onVehicleRegistration(vehicle: any) {
    this.vehicles.push(vehicle);
  }
}
