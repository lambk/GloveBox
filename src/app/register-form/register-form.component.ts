import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() submitSubject : Subject<void>;

  private form = {
    email: {
      value: '',
      valid: true
    },
    firstname: {
      value: '',
      valid: true
    },
    lastname: {
      value: '',
      valid: true
    },
    password: {
      value: '',
      valid: true
    }
  }

  constructor() { }

  ngOnInit() {
    this.submitSubject.subscribe(() => {
      this.submit();
    });
  }

  validateForm() {
    if (!this.form.email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this.form.email.valid = false;
    }
    if (!this.form.firstname.value.match(/^[a-zA-Z\-]+$/)) {
      this.form.firstname.valid = false;
    }
    if (!this.form.lastname.value.match(/^[a-zA-Z\-]+$/)) {
      this.form.lastname.valid = false;
    }
    if (!this.form.password.value.match(/^.{6,100}$/)) {
      this.form.password.valid = false;
    }
    return Object.entries(this.form).every(function(field) {
      return field[1].valid;
    });
  }

  submit() {
    if (this.validateForm()) {
      //todo Perform http call
    }
  }
}
