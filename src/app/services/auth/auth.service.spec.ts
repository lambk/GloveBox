import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';

class MockHttpClient {}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: HttpClient, useClass: MockHttpClient}
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
