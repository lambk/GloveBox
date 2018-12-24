import { VehicleService } from './../../services/vehicle/vehicle.service';
import { SubmitEvent } from './../../constants';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle.model';
import { map } from 'rxjs/operators';

const DEFAULT_PAGE_SIZE = 5;
const WOF_WARNING_THRESHOLD_DAYS = 30;
const PAGE_CAPACITY_OPTIONS = [5, 10, 15];

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {

  public vehicleStream: Observable<Vehicle[]>;
  public totalLength = 0;
  public registerSubject: Subject<void>;

  public isSubmitting = false;
  public searchInput = '';
  public pageNumber = 0;
  public vehiclesPerPage = DEFAULT_PAGE_SIZE;
  public pageCapacities = PAGE_CAPACITY_OPTIONS;
  public loadingVehicles = true;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.updateVehicleReference();
    this.vehicleService.getAll().subscribe((vehicles) => {
      this.loadingVehicles = false;
      this.totalLength = vehicles.length;
    });
    this.registerSubject = new Subject();
  }

  private updateVehicleReference() {
    const regex = new RegExp(this.searchInput, 'i');
    this.vehicleStream = this.vehicleService.getAll().pipe(
      map(vehicles => vehicles.filter(vehicle => {
        if (!this.searchInput) {
          return true;
        }
        const desc = `${vehicle.make} ${vehicle.model}`;
        return vehicle.plate.match(regex) || desc.match(regex);
      })),
      map(vehicles => vehicles.slice(this.pageNumber * this.vehiclesPerPage, (this.pageNumber + 1) * this.vehiclesPerPage)));
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

  onSearchInput() {
    this.updateVehicleReference();
  }

  getPageArray() {
    return Array.from({length: this.getLastPageNumber() + 1}, (v, i) => i);
  }

  getLastPageNumber() {
    if (!this.totalLength) {
      return 0;
    }
    return Math.ceil(this.totalLength / this.vehiclesPerPage) - 1;
  }

  setPageNumber(num: number) {
    this.pageNumber = num;
    this.updateVehicleReference();
  }

  onPageCapacityChange() {
    this.checkPageOutOfBounds();
    localStorage.setItem('pageCapacity', this.vehiclesPerPage.toString());
    this.updateVehicleReference();
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
    return this.getDaysUntilDate(dateStr) <= WOF_WARNING_THRESHOLD_DAYS;
  }
}
