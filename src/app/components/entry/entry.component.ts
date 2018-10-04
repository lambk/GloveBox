import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AlertType, AjaxEvent } from 'src/app/constants';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {

  loginSubmitSubject = new Subject<void>();
  registerSubmitSubject = new Subject<void>();

  collapsed = 0;

  alertdata: any = {
    msg: undefined,
    type: undefined,
    show: false
  };

  submitting: any = {
    login: false,
    register: false
  };

  constructor() {}

  onLoginClick(): void {
    if (this.collapsed === 1) {
      // Submits the login form externally
      this.loginSubmitSubject.next();
    } else {
      this.collapsed = 1;
    }
  }

  onRegisterClick(): void {
    if (this.collapsed === 2) {
      // Submits the registration form externally
      this.registerSubmitSubject.next();
    } else {
      this.collapsed = 2;
    }
  }

  /* Sets up the alerts from the login or registration submission */
  onRegistration(): void {
    this.collapsed = 0;
  }

  showAjaxLoader(event, source): void {
    const show = event.type === AjaxEvent.START;
    if (source === 'register') {
      this.submitting.register = show;
    } else {
      this.submitting.login = show;
    }
  }
}
