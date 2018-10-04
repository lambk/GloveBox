import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from 'src/app/interfaces/login.dto';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(data: LoginDTO) {
    const ajax = this.http.post(environment.server_url + '/auth/login', data,
      {responseType: 'json'}).pipe(shareReplay(1));
    ajax.pipe(map(res => res['token'])).subscribe(this.setToken);
    return ajax;
  }

  public resumeSession() {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const ajax = this.http.post(environment.server_url + '/auth/validate', {},
      { headers: headers, responseType: 'text' }).pipe(shareReplay(1));
    ajax.subscribe((res) => {}, this.removeToken);
    return ajax;
  }

  public logout() {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    const ajax = this.http.post(environment.server_url + '/auth/logout', {},
      { headers: headers, responseType: 'text' }).pipe(shareReplay(1));
    ajax.subscribe(this.removeToken, this.removeToken);
    return ajax;
  }

  private setToken(token: string) {
    console.log(token);
    localStorage.setItem('token', token);
  }

  private removeToken() {
    localStorage.removeItem('token');
  }
}
