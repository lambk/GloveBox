import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationDTO } from 'src/app/interfaces/registration.dto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public register(user: RegistrationDTO) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'dataType': 'text'
    });
    return this.http.post(environment.server_url + '/users', user, {headers: headers, responseType: 'text'});
  }
}
