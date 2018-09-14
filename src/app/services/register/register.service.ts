import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationDTO } from 'src/app/interfaces/registration.dto';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'dataType': 'text'
});

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public async registerUser(user: RegistrationDTO) {
    let result = await this.http.post(environment.server_url + '/users', user, {headers: headers, responseType: 'text'}).toPromise();
    return result
  }
}
