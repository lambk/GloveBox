import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleService } from './../../services/vehicle/vehicle.service';

@Component({
  selector: 'app-register-vehicle-form',
  templateUrl: './register-vehicle-form.component.html',
  styleUrls: ['./register-vehicle-form.component.css']
})
export class RegisterVehicleFormComponent implements OnInit {

  @ViewChild(NgForm) registerVehicleForm;
  public data: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
  }

  submit(): void {
    this.registerVehicleForm.submitted = true;
    this.registerVehicleForm.form.markAsPristine(); // Necessary to remove invalid styling once  the user starts modifying
    if (this.registerVehicleForm.invalid) {
      return;
    }
    this.vehicleService.register(this.data).subscribe((res) => {
      alert('success');
    }, (err) => {
      alert('err');
    });
  }

}
