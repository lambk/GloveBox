import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from 'src/app/interfaces/login.dto';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { LoadingManager } from 'src/app/components/app.component'

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'dataType': 'text'
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginObservable: Subject<boolean> = new Subject<boolean>();

  private loginData: any = {
    email: undefined,
    token: undefined
  };

  constructor(private http: HttpClient) { }

  public async login(data: LoginDTO) {
    let promise = this.http.post(environment.server_url + '/auth/login', data, {headers: headers, responseType: 'text'}).toPromise();
    promise.then((token) => {
      this.loginData.email = data.email;
      this.loginData.token = token;
      localStorage.setItem('email', data.email);
      localStorage.setItem('token', token);
      this.loginObservable.next(true);
    }, () => {});
    return promise;
  }

  public async resumeSession(email: string, token: string) {
    let promise = this.http.post(environment.server_url + '/auth/validate', {email: email, token: token}, {headers: headers, responseType: 'text'}).toPromise();
    promise.then(() => {
      this.loginData.email = email;
      this.loginData.token = token;
      this.loginObservable.next(true);
    }, () => {});
    return promise;
  }

  public async logout() {
    let promise = this.http.post(environment.server_url + '/auth/logout', this.loginData, {headers: headers, responseType: 'text'}).toPromise();
    promise.then(() => {
      this.loginData.email = undefined;
      this.loginData.token = undefined;
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      this.loginObservable.next(false);
    }, () => {});
    return promise;
  }

  public getLoginObservable(): Subject<boolean> {
    return this.loginObservable;
  }
}
