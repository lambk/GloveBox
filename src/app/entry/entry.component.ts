import { Component } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {

  private collapsed = {
    login: true,
    register: true
  };

  constructor() { }

  onLoginClick() {
    if (this.collapsed.login) {
      this.collapsed.register = true;
      this.collapsed.login = false;
      return;
    }
  }

  onRegisterClick() {
    if (this.collapsed.register) {
      this.collapsed.login = true;
      this.collapsed.register = false;
      return;
    }
  }
}
