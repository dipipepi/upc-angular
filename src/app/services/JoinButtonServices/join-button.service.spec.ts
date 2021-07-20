import { TestBed } from '@angular/core/testing';

import { JoinButtonService } from './join-button.service';

describe('JoinButtonService', () => {
  let service: JoinButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
