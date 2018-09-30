import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { RegisterService } from 'src/app/services/register/register.service';
import { AlertType, AjaxEvent } from 'src/app/constants';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() submitSubject: Subject<void>;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAjax: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(NgForm) registerForm;
  public data: any = {};

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.submitSubject.subscribe(() => this.submit());
  }

  submit(): void {
    this.registerForm.submitted = true;
    this.registerForm.form.markAsPristine(); //Necessary to remove invalid styling once  the user starts modifying
    if (this.registerForm.invalid) return;
    //Sets up the ajax data in the format expected by the server
    let formdata = {
      email: this.data.email,
      firstName: this.data.firstname,
      lastName: this.data.lastname,
      password: this.data.password
    };
    this.startLoadingSpinner();
    this.registerService.registerUser(formdata).then((response) => {
      //Reset the form
      this.registerForm.submitted = false;
      this.registerForm.form.reset();
      this.notifySuccess(response);
    }, (err) => {
      let error = err.status === 0 ? err.statusText : err.error;
      this.notifyFailure(error);
    }).then(() => this.stopLoadingSpinner());
  }

  private notifySuccess(msg: string): void {
    this.onSubmit.emit({
      successful: true,
      feedback: {
        msg: msg,
        type: AlertType.SUCCESS
      }
    });
  }

  private notifyFailure(error: string): void {
    this.onSubmit.emit({
      successful: false,
      feedback: {
        msg: error,
        type: AlertType.ERROR
      }
    });
  }

  private startLoadingSpinner(): void {
    this.onAjax.emit({type: AjaxEvent.START});
  }

  private stopLoadingSpinner(): void {
    this.onAjax.emit({type: AjaxEvent.END})
  }
}
