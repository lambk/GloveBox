import { SubmitEvent } from './../../constants';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-vehicle-modal',
  templateUrl: './register-vehicle-modal.component.html',
  styleUrls: ['./register-vehicle-modal.component.scss']
})
export class RegisterVehicleModalComponent implements OnInit {

  public registerSubject: Subject<void>;
  public isSubmitting = false;

  constructor() { }

  ngOnInit() {
    this.registerSubject = new Subject();
  }

  onRegisterClick() {
    this.registerSubject.next();
  }

  onSubmitEvent(event: SubmitEvent) {
    if (event === SubmitEvent.START) {
      this.isSubmitting = true;
    } else {
      this.isSubmitting = false;
    }
  }
}
