import { VehicleService } from './../../services/vehicle/vehicle.service';
import { SubmitEvent } from './../../constants';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle.model';

const defaultPageSize = 5;
const wofWarningPointInDays = 30;

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

  public vehicles: Vehicle[] = [];
  public filteredVehicles: Vehicle[] = [];
  public registerSubject: Subject<void>;

  public isSubmitting = false;
  public searchInput = '';
  public pageNumber = 0;
  public vehiclesPerPage = defaultPageSize;
  public loadingVehicles = true;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.registerSubject = new Subject();
    this.getVehicles();
    this.vehicleService.getVehicleSubject().subscribe(
      vehicles => {
        this.vehicles = vehicles;
        this.filterVehicles();
      },
      err => console.log(err));
    }

    getVehicles() {
      this.vehicleService.getAll().subscribe(
        vehicles => {
          this.vehicles = vehicles;
          this.filterVehicles();
      },
      err => console.log(err)).add(() => this.loadingVehicles = false);
  }

  filterVehicles() {
    const searchTerm = this.searchInput;
    this.filteredVehicles = this.vehicles.filter((vehicle) => {
      if (searchTerm === '') {
        return true;
      }
      const vehicleDesc = vehicle.make + ' ' + vehicle.model;
      return vehicle.plate.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
       || vehicleDesc.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });
    this.checkPageOutOfBounds();
  }

  getVehiclesToDisplay() {
    return this.filteredVehicles.slice(this.pageNumber * this.vehiclesPerPage, (this.pageNumber + 1) * this.vehiclesPerPage);
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
    return Array.from({length: this.getLastPageNumber() + 1}, (v, i) => i);
  }

  getLastPageNumber() {
    if (this.filteredVehicles.length === 0) {
      return 0;
    }
    return Math.ceil(this.filteredVehicles.length / this.vehiclesPerPage) - 1;
  }

  setPageNumber(num: number) {
    this.pageNumber = num;
  }

  onPageCapacityChange() {
    this.checkPageOutOfBounds();
  }

  checkPageOutOfBounds() {
    const lastPage = this.getLastPageNumber();
    if (this.pageNumber > lastPage) {
      this.pageNumber = lastPage;
    }
  }

  getDaysUntilDate(dateStr: string) {
    const today  = new Date();
    const diff = new Date(dateStr).getTime() - today.getTime();
    return Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  isWoFInFuture(dateStr: string) {
    return this.getDaysUntilDate(dateStr) >= 0;
  }

  isWoFNearlyDue(dateStr: string) {
    return this.getDaysUntilDate(dateStr) <= wofWarningPointInDays;
  }
}
