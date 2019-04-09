import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  vehicleObservable: Observable<Vehicle>;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.loadVehicle(params.plate));
  }

  private loadVehicle(plate: string) {
    this.vehicleObservable = this.vehicleService.getOne(plate);
  }

}
