import { Observable, of } from 'rxjs';
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

  private vehicles: Vehicle[];

  constructor(private http: HttpClient) { }

  register(vehicle: VehicleRegistrationDTO) {
    return this.http.post(`${environment.server_url}/vehicles/${localStorage.getItem('id')}`,
      vehicle, {headers: headers, responseType: 'text'});
  }

  getAll() {
    if (this.vehicles) {
      return of(this.vehicles);
    }
    const ajax = this.http.get<Vehicle[]>(`${environment.server_url}/vehicles/${localStorage.getItem('id')}`,
      {headers: headers, responseType: 'json'});
    ajax.subscribe((res) => this.vehicles = res);
    return ajax;
  }
}
