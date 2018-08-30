import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';

const options = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public async registerUser(user: IUser) {
    let result = await this.http.get('https://jsonplaceholder.typicode.com/todos/1').toPromise();
    console.log(result);
  }
}
