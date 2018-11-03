import { shareReplay } from 'rxjs/operators';
import { of, Subject, Observable } from 'rxjs';
import { Vehicle } from './../../interfaces/vehicle.model';
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
      this.pushVehiclesUpdate();
    });
    return ajax;
  }

  getAll() {
    if (this.vehicles.length > 0) {
      return of(this.vehicles);
    }
    const ajax = this.http.get<Vehicle[]>(`${environment.server_url}/vehicles/${localStorage.getItem('id')}`,
      {headers: headers, responseType: 'json'});
    ajax.subscribe(response => this.vehicles = response);
    return ajax;
  }

  getVehicleSubject() {
    return this.vehicleSubject;
  }

  private pushVehiclesUpdate() {
    this.vehicleSubject.next(this.vehicles);
  }
}
