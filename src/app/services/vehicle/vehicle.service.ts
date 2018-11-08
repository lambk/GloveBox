import { Vehicle } from 'src/app/interfaces/vehicle.model';
import { shareReplay, map } from 'rxjs/operators';
import { of, Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VehicleRegistrationDTO } from 'src/app/interfaces/vehicleRegistration.dto';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({
  'token': localStorage.getItem('token'),
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicles: Vehicle[] = [];
  private vehicleSubject: Subject<Vehicle[]>;

  constructor(private http: HttpClient) {
    this.vehicleSubject = new Subject();
  }

  register(vehicle: VehicleRegistrationDTO) {
    const ajax = this.http.post<Vehicle>(`${environment.server_url}/vehicles/${localStorage.getItem('id')}`,
      vehicle, {headers: headers}).pipe(shareReplay(1));
    ajax.subscribe((response) => {
      this.vehicles.push(response);
      this.vehicles = this.sortVehicles(this.vehicles);
      this.pushVehiclesUpdate();
    });
    return ajax;
  }

  getAll() {
    if (this.vehicles.length > 0) {
      return of(this.vehicles);
    }
    const ajax = this.http.get<Vehicle[]>(`${environment.server_url}/vehicles/${localStorage.getItem('id')}`,
      {headers: headers, responseType: 'json'}).pipe(map(vehicles => {
        return this.sortVehicles(vehicles);
      }));
    ajax.subscribe(response => this.vehicles = response);
    return ajax;
  }

  private sortVehicles(vehicles: Vehicle[]) {
    return vehicles.sort((a, b) => a.plate < b.plate ? -1 : a.plate === b.plate ? 0 : 1);
  }

  getVehicleSubject() {
    return this.vehicleSubject;
  }

  private pushVehiclesUpdate() {
    this.vehicleSubject.next(this.vehicles);
  }
}
