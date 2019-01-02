import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Vehicle } from 'src/app/interfaces/vehicle.model';
import { VehicleRegistrationDTO } from 'src/app/interfaces/vehicleRegistration.dto';
import { Headers } from 'src/app/util/headers';
import { environment } from 'src/environments/environment';
import { StateManager } from './../../interfaces/stateManager';
import { StateService } from './../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService implements StateManager {

  private vehicles: Vehicle[];
  private vehicleUpdateSubject: Subject<any>;
  public vehicleUpdateObservable: Observable<any>;

  constructor(private http: HttpClient, private stateService: StateService) {
    this.stateService.registerStateManager(this);
    this.vehicleUpdateSubject = new Subject();
    this.vehicleUpdateObservable = this.vehicleUpdateSubject.asObservable();
  }

  clearState() {
    this.vehicles = undefined;
  }

  register(vehicle: VehicleRegistrationDTO) {
    vehicle.plate = vehicle.plate.toUpperCase();
    return this.http.post<Vehicle>(`${environment.server_url}/vehicles/${localStorage.getItem('id')}`,
      vehicle, {headers: Headers.getStandardHeaders()}).pipe(
        tap((vehicleResult) => {
          this.vehicles.push(vehicleResult);
          this.vehicles = this.sortVehicles(this.vehicles);
          this.notifyVehicleUpdate();
        })
      );
  }

  getAll() {
    if (this.vehicles) {
      return of(this.vehicles);
    }
    return this.http.get<Vehicle[]>(`${environment.server_url}/vehicles/${localStorage.getItem('id')}`,
      {headers: Headers.getStandardHeaders(), responseType: 'json'}).pipe(
        map(vehicles => this.sortVehicles(vehicles)),
        tap(sortedVehicles => this.vehicles = sortedVehicles)
      );
  }

  private sortVehicles(vehicles: Vehicle[]) {
    return vehicles.sort((a, b) => a.plate < b.plate ? -1 : a.plate === b.plate ? 0 : 1);
  }

  private notifyVehicleUpdate() {
    this.vehicleUpdateSubject.next();
  }
}
