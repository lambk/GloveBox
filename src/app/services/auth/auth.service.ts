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

  private loginData: any = {
    email: undefined,
    token: undefined
  };

  constructor(private http: HttpClient) { }

  public async login(data: LoginDTO) {
    let promise = this.http.post(environment.server_url + '/auth/login', data, {responseType: 'json'}).toPromise();
    promise.then((res) => {
      this.loginData.email = res['email'];
      this.loginData.token = res['token'];
      localStorage.setItem('email', res['email']);
      localStorage.setItem('token', res['token']);
      this.loginObservable.next(true);
    }, () => {});
    return promise;
  }

  public async resumeSession(token: string) {
    let promise = this.http.post(environment.server_url + '/auth/validate', undefined,
      { headers: new HttpHeaders({
        'token': token,
        'Content-Type':'application/json'
      }),
      responseType: 'text'}).toPromise();
    promise.then((res) => {
      this.loginData.token = token;
      this.loginObservable.next(true);
    }, (err) => console.log(err));
    return promise;
  }

  public async logout() {
    let promise = this.http.post(environment.server_url + '/auth/logout', undefined,
      { headers: new HttpHeaders({
        'token': this.loginData.token,
        'Content-Type':'application/json'
      }),
      responseType: 'text'}).toPromise();
    promise.then(() => {
      this.loginData.email = undefined;
      this.loginData.token = undefined;
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      this.loginObservable.next(false);
    }, (err) => console.log(err));
    return promise;
  }

  public getLoginObservable(): Subject<boolean> {
    return this.loginObservable;
  }
}
