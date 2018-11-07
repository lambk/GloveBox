import { VehicleService } from './../../services/vehicle/vehicle.service';
import { SubmitEvent } from './../../constants';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle.model';

const defaultPageSize = 5;

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

  public vehicles: Vehicle[] = [];
  public registerSubject: Subject<void>;
  public isSubmitting = false;
  public pageNumber = 0;
  public vehiclesPerPage = defaultPageSize;
  public loadingVehicles = true;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.registerSubject = new Subject();
    this.getVehicles();
    this.vehicleService.getVehicleSubject().subscribe(vehicles => this.vehicles = vehicles,
      err => console.log(err));
  }

  getVehicles() {
    this.vehicleService.getAll().subscribe((res) => this.vehicles = res,
      (err) => console.log(err)).add(() => this.loadingVehicles = false);
  }

  getVehiclesForPage(pageNumber: number) {
    return this.vehicles.sort((a, b) => a.plate < b.plate ? -1 : a.plate === b.plate ? 0 : 1)
      .slice(pageNumber * this.vehiclesPerPage, (pageNumber + 1) * this.vehiclesPerPage);
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

  getPageArray() {
    const numPages = Math.ceil(this.vehicles.length / this.vehiclesPerPage);
    return Array.from({length: numPages}, (v, i) => i);
  }

  setPageNumber(num: number) {
    this.pageNumber = num;
  }

  getLastPageNumber() {
    return Math.ceil(this.vehicles.length / this.vehiclesPerPage) - 1;
  }

  onPageCapacityChange() {
    const lastPage = this.getLastPageNumber();
    if (this.pageNumber > lastPage) {
      this.pageNumber = lastPage;
    }
  }
}
