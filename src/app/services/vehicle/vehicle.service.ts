import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VehicleRegistrationDTO } from 'src/app/interfaces/vehicleRegistration.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  register(vehicle: VehicleRegistrationDTO) {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.server_url + '/vehicles', vehicle, {headers: headers, responseType: 'text'});
  }
}