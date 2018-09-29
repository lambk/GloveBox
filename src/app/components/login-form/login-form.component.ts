import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertType, AjaxEvent } from 'src/app/constants';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Input() submitSubject: Subject<void>;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAjax: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(NgForm) loginForm;
  public data: any = {};

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
    this.submitSubject.subscribe(() => this.submit());
  }

  submit(): void {
    this.loginForm.submitted = true;
    this.loginForm.form.markAsPristine(); //Necessary to remove invalid styling once  the user starts modifying
    if (this.loginForm.invalid) return;
    //Sets up the ajax data in the format expected by the server
    let formdata = {
      email: this.data.email,
      password: this.data.password
    };
    this.startLoadingSpinner();
    this.AuthService.login(formdata).then((response) => {
      //Reset the form
      this.loginForm.submitted = false;
      this.loginForm.form.reset();
      this.notifySuccess();
    }, (err) => {
      let error = err.status === 0 ? err.statusText : err.error;
      this.notifyFailure(error);
    }).finally(this.stopLoadingSpinner);
  }

  private notifySuccess(): void {
    this.onSubmit.emit({
      successful: true
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
