import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

class MockHttpClient {}

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {provide: HttpClient, useClass: MockHttpClient}
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
