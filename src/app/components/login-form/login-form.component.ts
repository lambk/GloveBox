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

  @ViewChild(NgForm) form;
  private data: any = {};

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
    this.submitSubject.subscribe(() => this.submit());
  }

  submit(): void {
    this.form.submitted = true;
    this.form.form.markAsPristine(); //Necessary to remove invalid styling once  the user starts modifying
    if (this.form.invalid) return;
    //Sets up the ajax data in the format expected by the server
    let formdata = {
      email: this.data.email,
      password: this.data.password
    };
    this.onAjax.emit({type: AjaxEvent.START});
    this.AuthService.login(formdata).then((response) => {
      //Reset the form
      this.form.submitted = false;
      this.form.form.reset();
      this.onSubmit.emit({
        successful: true
      });
    }, (err) => {
      let errorMsg = err.status === 0 ? err.statusText : err.error;
      this.onSubmit.emit({
        successful: false,
        feedback: {
          msg: errorMsg,
          type: AlertType.ERROR
        }
      });
    }).then(() => this.onAjax.emit({type: AjaxEvent.END}));
  }

}
