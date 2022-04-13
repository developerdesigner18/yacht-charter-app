import { TestBed } from '@angular/core/testing';

import { EditQSpdService } from './edit-q-spd.service';

describe('EditQSpdService', () => {
  let service: EditQSpdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditQSpdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
