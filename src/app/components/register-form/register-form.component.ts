import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { RegisterService } from '../../services/register.service';
import { AlertType } from '../../constants';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() submitSubject : Subject<void>;
  @Output() onSubmit = new EventEmitter;

  @ViewChild(NgForm) form;
  data: any = {};

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.submitSubject.subscribe(() => {
      this.submit();
    });
  }

  submit() {
    this.form.submitted = true;
    this.form.form.markAsPristine(); //Necessary to remove invalid styling once  the user starts modifying
    if (this.form.invalid) return;
    let formdata = {
      user: {
        email: this.data.email,
        firstName: this.data.firstname,
        lastName: this.data.lastname,
      },
      password: this.data.password
    };
    this.registerService.registerUser(formdata).then((response) => {
      //Reset the form
      this.form.submitted = false;
      this.form.form.reset();
      this.onSubmit.emit({
        successful: true,
        feedback: {
          msg: response,
          type: AlertType.SUCCESS
        }
      });
    }, (err) => {
      this.onSubmit.emit({
        successful: false,
        feedback: {
          msg: err.error,
          type: AlertType.ERROR
        }
      });
    });
  }
}
