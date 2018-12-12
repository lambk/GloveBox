import { VehicleService } from './../../services/vehicle/vehicle.service';
import { SubmitEvent } from './../../constants';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle.model';
import { computed, observable } from 'mobx-angular';

const DEFAULT_PAGE_SIZE = 5;
const WOF_WARNING_THRESHOLD_DAYS = 30;
const PAGE_CAPACITY_OPTIONS = [5, 10, 15];

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {

  public vehicles: Vehicle[] = [];
  @observable public filteredVehicles: Vehicle[] = [];
  public registerSubject: Subject<void>;

  public isSubmitting = false;
  public searchInput = '';
  public pageNumber = 0;
  @observable public vehiclesPerPage = DEFAULT_PAGE_SIZE;
  public pageCapacities = PAGE_CAPACITY_OPTIONS;
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
    return Array.from({length: this.getLastPageNumber + 1}, (v, i) => i);
  }

  @computed get getLastPageNumber() {
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
    localStorage.setItem('pageCapacity', this.vehiclesPerPage.toString());
  }

  checkPageOutOfBounds() {
    const lastPage = this.getLastPageNumber;
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
    return this.getDaysUntilDate(dateStr) <= WOF_WARNING_THRESHOLD_DAYS;
  }
}
