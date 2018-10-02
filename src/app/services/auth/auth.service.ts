import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from 'src/app/interfaces/login.dto';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { LoadingManager } from 'src/app/components/app.component'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginObservable: Subject<boolean> = new Subject<boolean>();

  private token: string = undefined;

  constructor(private http: HttpClient) { }

  public login(data: LoginDTO) {
    return this.http.post(environment.server_url + '/auth/login', data, {responseType: 'json'});
  }

  public async resumeSession(token: string) {
    const headers = new HttpHeaders({
      'token': token,
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.server_url + '/auth/validate', undefined,
      { headers: headers, responseType: 'text' });
  }

  public async logout() {
    const headers = new HttpHeaders({
      'token': this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.server_url + '/auth/logout', undefined,
      { headers: headers, responseType: 'text' });
  }

  public getLoginObservable(): Subject<boolean> {
    return this.loginObservable;
  }
}
