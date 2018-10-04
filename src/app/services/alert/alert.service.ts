import { Subject } from 'rxjs';
import { AlertType } from 'src/app/constants';
import { Injectable } from '@angular/core';

export interface Alert {
  message: string;
  type: AlertType;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertObservable = new Subject<Alert>();

  constructor() { }

  public getAlertObservable() {
    return this.alertObservable;
  }

  public sendAlert(alert: Alert) {
    this.alertObservable.next(alert);
  }
}
