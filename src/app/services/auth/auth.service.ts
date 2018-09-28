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

  public async login(data: LoginDTO) {
    let task = this.http.post(environment.server_url + '/auth/login', data, {responseType: 'json'}).toPromise();
    task.then((res) => {
      this.token = res['token'];
      localStorage.setItem('token', res['token']);
      this.loginObservable.next(true);
    }, () => {});
    return task;
  }

  public async resumeSession(token: string) {
    let task = this.http.post(environment.server_url + '/auth/validate', undefined,
      { headers: new HttpHeaders({
        'token': token,
        'Content-Type':'application/json'
      }),
      responseType: 'text'}).toPromise();
    task.then((res) => {
      this.token = token;
      this.loginObservable.next(true);
    }, (err) => console.log(err));
    return task;
  }

  public async logout() {
    let task = this.http.post(environment.server_url + '/auth/logout', undefined,
      { headers: new HttpHeaders({
        'token': this.token,
        'Content-Type':'application/json'
      }),
      responseType: 'text'}).toPromise();
    task.then(() => {
      this.token = undefined;
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      this.loginObservable.next(false);
    }, (err) => console.log(err));
    return task;
  }

  public getLoginObservable(): Subject<boolean> {
    return this.loginObservable;
  }
}
