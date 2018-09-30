import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-vehicle-form',
  templateUrl: './register-vehicle-form.component.html',
  styleUrls: ['./register-vehicle-form.component.css']
})
export class RegisterVehicleFormComponent implements OnInit {

  @ViewChild(NgForm) registerVehicleForm;
  public data: any = {};

  constructor() { }

  ngOnInit() {
  }

  submit(): void {
    this.registerVehicleForm.submitted = true;
    this.registerVehicleForm.form.markAsPristine(); //Necessary to remove invalid styling once  the user starts modifying
    if (this.registerVehicleForm.invalid) return;
  }

}
