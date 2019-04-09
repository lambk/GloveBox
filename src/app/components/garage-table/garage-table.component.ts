import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle.model';

@Component({
  selector: 'app-garage-table',
  templateUrl: './garage-table.component.html',
  styleUrls: ['./garage-table.component.scss']
})
export class GarageTableComponent implements OnInit {
  @Input() vehicles: Vehicle[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onVehicleClick(vehicle: Vehicle) {
    this.router.navigate(['/vehicle', vehicle.plate]);
  }
}
