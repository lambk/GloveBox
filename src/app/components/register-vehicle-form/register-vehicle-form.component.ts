import { Subject } from 'rxjs';
import { AlertService } from './../../services/alert/alert.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleService } from './../../services/vehicle/vehicle.service';
import * as $ from 'jquery';
import { AlertType } from 'src/app/constants';

@Component({
  selector: 'app-register-vehicle-form',
  templateUrl: './register-vehicle-form.component.html',
  styleUrls: ['./register-vehicle-form.component.css']
})
export class RegisterVehicleFormComponent implements OnInit {

  @Input() registerSubject: Subject<void>;
  @ViewChild(NgForm) registerVehicleForm;
  public data: any = {};

  constructor(private vehicleService: VehicleService, private alertService: AlertService) { }

  ngOnInit() {
    this.registerSubject.subscribe(() => this.submit());
  }

  submit(): void {
    this.registerVehicleForm.submitted = true;
    this.registerVehicleForm.form.markAsPristine(); // Necessary to remove invalid styling once  the user starts modifying
    if (this.registerVehicleForm.invalid) {
      return;
    }
    this.vehicleService.register(this.data).subscribe((res) => {
      $('#registerVehicleModal .close').click();
    }, (err) => {
      this.alertService.sendAlert({message: err.error, type: AlertType.ERROR});
    });
  }

}
