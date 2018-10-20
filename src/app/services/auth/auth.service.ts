import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { LoginDTO } from 'src/app/interfaces/login.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(data: LoginDTO) {
    const ajax = this.http.post(environment.server_url + '/auth/login', data,
      {responseType: 'json'}).pipe(shareReplay(1));
    ajax.subscribe(this.saveLoginData);
    return ajax;
  }

  public resumeSession() {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const ajax = this.http.post(environment.server_url + '/auth/validate', localStorage.getItem('id'),
      { headers: headers, responseType: 'text' }).pipe(shareReplay(1));
    ajax.subscribe((res) => {}, this.removeLoginData);
    return ajax;
  }

  public logout() {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const ajax = this.http.post(environment.server_url + '/auth/logout', localStorage.getItem('id'),
      { headers: headers, responseType: 'text' }).pipe(shareReplay(1));
    ajax.subscribe(this.removeLoginData, this.removeLoginData);
    return ajax;
  }

  private saveLoginData(data) {
    localStorage.setItem('id', data.id);
    localStorage.setItem('token', data.token);
  }

  private removeLoginData() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  }
}
