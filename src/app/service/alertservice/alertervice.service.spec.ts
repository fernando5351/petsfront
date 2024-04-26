import { TestBed } from '@angular/core/testing';

import { AlertService } from './alertervice.service';

describe('AlerterviceService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
