import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

  public vehicles = [
    {
      plate: 'ABC123',
      make: 'Toyota',
      model: 'Celica',
      year: 1994
    },
    {
      plate: 'HHH111',
      make: 'Honda',
      model: 'Integra',
      year: 1994
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
