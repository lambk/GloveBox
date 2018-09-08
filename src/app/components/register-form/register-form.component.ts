import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() submitSubject : Subject<void>;
  @Output() onComplete = new EventEmitter;

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
    this.form.form.markAsPristine();
    if (this.form.invalid) return;
    let formdata = {
      user: {
        email: this.data.email,
        firstName: this.data.firstname,
        lastName: this.data.lastname,
      },
      password: this.data.password
    };
    let completion = this.onComplete;
    this.registerService.registerUser(formdata).then((res) => {
      completion.emit();
    }, (err) => {
      console.log(err);
      alert('Error registering user');
    });
  }
}
