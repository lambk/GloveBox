import { Component } from '@angular/core';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {

  private registerSubmitSubject : Subject<void>

  private collapsed = {
    login: true,
    register: true
  };

  constructor() {
    this.registerSubmitSubject = new Subject<void>()
  }

  onRegisterClick() {
    if (this.collapsed.register) {
      this.collapsed.register = false;
    } else {
      this.registerSubmitSubject.next();
    }
  }
}
