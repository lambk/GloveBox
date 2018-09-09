import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  animations: [
    trigger('errorFade', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-10px)'}),
        animate(500, style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate(500, style({
          opacity:0,
          transform: 'translateY(-10px)'
        }))
      ])
    ])
  ]
})
export class RegisterFormComponent implements OnInit {

  @Input() submitSubject : Subject<void>;
  @Output() onComplete = new EventEmitter;

  @ViewChild(NgForm) form;
  data: any = {};
  error: any = {
    msg: undefined,
    show: false
  };

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
    this.registerService.registerUser(formdata).then((res) => {
      //Reset the form
      this.error.show = false;
      this.form.submitted = false;
      this.form.form.reset();
      //Emit completion event so the entry component can collapse the form
      this.onComplete.emit();
    }, (err) => {
      this.error.msg = err.error;
      this.error.show = true;
    });
  }
}
