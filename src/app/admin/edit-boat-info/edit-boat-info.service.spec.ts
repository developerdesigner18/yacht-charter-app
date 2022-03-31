import { TestBed } from '@angular/core/testing';

import { EditBoatInfoService } from './edit-boat-info.service';

describe('EditBoatInfoService', () => {
  let service: EditBoatInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditBoatInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
