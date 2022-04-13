import { TestBed } from '@angular/core/testing';

import { QSpdService } from './q-spd.service';

describe('QSpdService', () => {
  let service: QSpdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QSpdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
