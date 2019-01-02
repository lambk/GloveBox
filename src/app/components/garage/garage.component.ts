import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Vehicle } from 'src/app/interfaces/vehicle.model';
import { VehicleService } from './../../services/vehicle/vehicle.service';

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

  public searchInput = '';
  public pageNumber = 0;
  public vehiclesPerPage = DEFAULT_PAGE_SIZE;
  public pageCapacities = PAGE_CAPACITY_OPTIONS;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.updateVehicleReference();
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
      tap(vehicles => this.totalLength = vehicles.length),
      map(vehicles => vehicles.slice(this.pageNumber * this.vehiclesPerPage, (this.pageNumber + 1) * this.vehiclesPerPage)));
  }

  onSearchInput() {
    this.updateVehicleReference();
  }

  onPageChange(num: number) {
    this.pageNumber = num;
    this.updateVehicleReference();
  }

  onPageCapacityChange() {
    localStorage.setItem('pageCapacity', this.vehiclesPerPage.toString());
    this.updateVehicleReference();
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
