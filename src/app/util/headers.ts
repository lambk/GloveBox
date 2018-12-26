import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class Headers {
    public static getStandardHeaders() {
        return new HttpHeaders({
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          });
    }
}
