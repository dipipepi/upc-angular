import { TestBed } from '@angular/core/testing';

import { PortalResourcesServiceService } from './portal-resources-service.service';

describe('PortalResourcesServiceService', () => {
  let service: PortalResourcesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortalResourcesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
