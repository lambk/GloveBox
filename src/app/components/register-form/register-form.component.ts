import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild(NgForm) form;
  private data: any = {};

  constructor(private registerService: RegisterService) { }

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
      firstName: this.data.firstname,
      lastName: this.data.lastname,
      password: this.data.password
    };
    this.onAjax.emit({type: AjaxEvent.START});
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
