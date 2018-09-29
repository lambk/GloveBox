import { Component } from '@angular/core';
import { RegisterFormComponent } from 'src/app/components/register-form/register-form.component';
import { Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AlertType, AjaxEvent } from 'src/app/constants';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  animations: [
    trigger('alertFade', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-10px)'}),
        animate(500, style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate(500, style({
          opacity:0,
          transform: 'translateY(-10px)'
        }))
      ])
    ])
  ]
})
export class EntryComponent {

  public loginSubmitSubject: Subject<void>
  public registerSubmitSubject: Subject<void>

  public collapsed: number = 0;

  public alertdata: any = {
    msg: undefined,
    type: undefined,
    show: false
  };

  public submitting: any = {
    login: false,
    register: false
  }

  constructor() {
    this.loginSubmitSubject = new Subject<void>();
    this.registerSubmitSubject = new Subject<void>();
  }

  onLoginClick(): void {
    if (this.collapsed === 1) {
      //Submits the login form externally
      this.loginSubmitSubject.next();
    } else {
      this.collapsed = 1;
    }
  }

  onRegisterClick(): void {
    if (this.collapsed === 2) {
      //Submits the registration form externally
      this.registerSubmitSubject.next();
    } else {
      this.collapsed = 2;
    }
  }

  /* Sets up the alerts from the login or registration submission */
  onSubformSubmit(event): void {
    if (event.successful) {
      this.collapsed = 0;
    }
    if (event.feedback) {
      this.alertdata.msg = event.feedback.msg;
      this.alertdata.type = event.feedback.type;
      this.alertdata.show = true;
    }
  }

  showAjaxLoader(event, source): void {
    let show = event.type === AjaxEvent.START;
    if (source === 'register') {
      this.submitting.register = show;
    } else {
      this.submitting.login = show;
    }
  }
}
