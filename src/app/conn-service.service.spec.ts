import { TestBed } from '@angular/core/testing';

import { ConnServiceService } from './conn-service.service';

describe('ConnServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnServiceService = TestBed.get(ConnServiceService);
    expect(service).toBeTruthy();
  });
});
