import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Vehicle } from 'src/app/interfaces/vehicle.model';
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

  constructor(private http: HttpClient) {
  }

  register(vehicle: VehicleRegistrationDTO) {
    vehicle.plate = vehicle.plate.toUpperCase();
    return this.http.post<Vehicle>(`${environment.server_url}/vehicles/${localStorage.getItem('id')}`,
      vehicle, {headers: headers}).pipe(
        tap((vehicleResult) => {
          this.vehicles.push(vehicleResult);
          this.vehicles = this.sortVehicles(this.vehicles);
        })
      );
  }

  getAll() {
    if (this.vehicles) {
      return of(this.vehicles);
    }
    return this.http.get<Vehicle[]>(`${environment.server_url}/vehicles/${localStorage.getItem('id')}`,
      {headers: headers, responseType: 'json'}).pipe(
        map(vehicles => this.sortVehicles(vehicles)),
        tap(sortedVehicles => this.vehicles = sortedVehicles)
      );
  }

  private sortVehicles(vehicles: Vehicle[]) {
    return vehicles.sort((a, b) => a.plate < b.plate ? -1 : a.plate === b.plate ? 0 : 1);
  }
}
