import { AlertService } from './../../services/alert/alert.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { AlertType, SubmitEvent } from 'src/app/constants';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() submitSubject: Subject<void>;
  @Output() submitEvent = new EventEmitter<SubmitEvent>();
  @Output() registrationEvent = new EventEmitter<void>();

  @ViewChild(NgForm) registerForm;
  public data: any = {};
  public disableForm = false;

  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.submitSubject.subscribe(() => this.submit());
  }

  submit(): void {
    this.registerForm.submitted = true;
    this.registerForm.form.markAsPristine(); // Necessary to remove invalid styling once  the user starts modifying
    if (this.registerForm.invalid) { return; }
    this.onSubmitStart();
    this.userService.register(this.data).subscribe((response) => {
      // Reset the form
      this.registerForm.submitted = false;
      this.registerForm.form.reset();
      this.registrationEvent.next();
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
    }).add(() => this.onSubmitEnd());
  }

  private onSubmitStart() {
    this.disableForm = true;
    this.submitEvent.emit(SubmitEvent.START);
  }

  private onSubmitEnd() {
    this.disableForm = false;
    this.submitEvent.emit(SubmitEvent.END);
  }
}
