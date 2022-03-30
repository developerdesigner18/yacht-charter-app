import { TestBed } from '@angular/core/testing';

import { BrokeredBoatsService } from './brokered-boats.service';

describe('BrokeredBoatsService', () => {
  let service: BrokeredBoatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrokeredBoatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
