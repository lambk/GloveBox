import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { AlertType, AjaxEvent } from 'src/app/constants';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Input() submitSubject: Subject<void>;
  @Output() submitEvent = new EventEmitter<any>();
  @Output() ajaxEvent = new EventEmitter<any>();

  @ViewChild(NgForm) loginForm;
  public data: any = {};

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.submitSubject.subscribe(() => this.submit());
  }

  submit(): void {
    this.loginForm.submitted = true;
    this.loginForm.form.markAsPristine(); // Necessary to remove invalid styling once  the user starts modifying
    if (this.loginForm.invalid) { return; }
    // Sets up the ajax data in the format expected by the server
    const formdata = {
      email: this.data.email,
      password: this.data.password
    };
    this.startLoadingSpinner();
    this.authService.login(formdata).subscribe((response) => {
      this.router.navigate(['/']);
    }, (err) => {
      this.stopLoadingSpinner();
      const error = err.status === 0 ? err.statusText : err.error;
      this.alertService.sendAlert({
        message: error,
        type: AlertType.ERROR
      });
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
    this.ajaxEvent.emit({type: AjaxEvent.END});
  }

}
