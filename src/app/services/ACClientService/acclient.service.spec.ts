import { TestBed } from '@angular/core/testing';

import { ACClientService } from './acclient.service';

describe('ACClientService', () => {
  let service: ACClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ACClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
