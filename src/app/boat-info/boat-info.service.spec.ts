import { TestBed } from '@angular/core/testing';

import { BoatInfoService } from './boat-info.service';

describe('BoatInfoService', () => {
  let service: BoatInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoatInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
