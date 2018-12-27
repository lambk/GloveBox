import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';

class MockHttpClient {}

describe('VehicleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VehicleService,
        {provide: HttpClient, useClass: MockHttpClient}
      ]
    });
  });

  it('should be created', inject([VehicleService], (service: VehicleService) => {
    expect(service).toBeTruthy();
  }));
});
