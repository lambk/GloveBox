import { Component } from '@angular/core';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AlertType } from '../../constants';

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

  private registerSubmitSubject: Subject<void>

  private collapsed: any = {
    login: true,
    register: true
  };

  private alertdata: any = {
    msg: undefined,
    type: undefined,
    show: false
  };

  constructor() {
    this.registerSubmitSubject = new Subject<void>();
  }

  onRegisterClick(): void {
    if (this.collapsed.register) {
      this.collapsed.register = false;
    } else {
      this.registerSubmitSubject.next();
    }
  }

  onRegisterSubmit(event): void {
    if (event.successful) {
      this.collapsed.register = true;
    }
    this.alertdata.msg = event.feedback.msg;
    this.alertdata.type = event.feedback.type;
    this.alertdata.show = true;
  }

  onLoginClick(): void {

  }
}
