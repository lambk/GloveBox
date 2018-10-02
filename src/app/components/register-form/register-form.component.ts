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
  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() ajaxEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(NgForm) registerForm;
  public data: any = {};

  constructor(private userService: UserService) { }

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
      this.stopLoadingSpinner();
      // Reset the form
      this.registerForm.submitted = false;
      this.registerForm.form.reset();
      this.notifySuccess(response);
    }, (err) => {
      this.stopLoadingSpinner();
      const error = err.status === 0 ? err.statusText : err.error;
      this.notifyFailure(error);
    });
  }

  private notifySuccess(msg: string): void {
    this.submitEvent.emit({
      successful: true,
      feedback: {
        msg: msg,
        type: AlertType.SUCCESS
      }
    });
  }

  private notifyFailure(error: string): void {
    this.submitEvent.emit({
      successful: false,
      feedback: {
        msg: error,
        type: AlertType.ERROR
      }
    });
  }

  private startLoadingSpinner(): void {
    this.ajaxEvent.emit({type: AjaxEvent.START});
  }

  private stopLoadingSpinner(): void {
    this.ajaxEvent.emit({type: AjaxEvent.END})
  }
}
