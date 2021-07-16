import { TestBed } from '@angular/core/testing';

import { SWCClientService } from './swcclient.service';

describe('SWCClientService', () => {
  let service: SWCClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SWCClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
