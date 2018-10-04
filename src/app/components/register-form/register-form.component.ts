import { AlertService } from './../../services/alert/alert.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { AlertType, AjaxEvent } from 'src/app/constants';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() submitSubject: Subject<void>;
  @Output() submitEvent = new EventEmitter<any>();
  @Output() ajaxEvent = new EventEmitter<any>();

  @ViewChild(NgForm) registerForm;
  data: any = {};

  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.submitSubject.subscribe(() => this.submit());
  }

  submit(): void {
    this.registerForm.submitted = true;
    this.registerForm.form.markAsPristine(); // Necessary to remove invalid styling once  the user starts modifying
    if (this.registerForm.invalid) { return; }
    // Sets up the ajax data in the format expected by the server
    const formdata = {
      email: this.data.email,
      firstName: this.data.firstname,
      lastName: this.data.lastname,
      password: this.data.password
    };
    this.startLoadingSpinner();
    this.userService.register(formdata).subscribe((response) => {
      // Reset the form
      this.registerForm.submitted = false;
      this.registerForm.form.reset();
      this.submitEvent.next();
      this.alertService.sendAlert({
        message: 'Account created',
        type: AlertType.SUCCESS
      });
    }, (err) => {
      const error = err.status !== 0 ? err.error : `Service error (Status code: ${err.status})`;
      this.alertService.sendAlert({
        message: error,
        type: AlertType.ERROR
      });
    }).add(() => this.stopLoadingSpinner());
  }

  private startLoadingSpinner() {
    this.ajaxEvent.emit({type: AjaxEvent.START});
  }

  private stopLoadingSpinner() {
    this.ajaxEvent.emit({type: AjaxEvent.END});
  }
}
