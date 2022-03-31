import { TestBed } from '@angular/core/testing';

import { EditHomeService } from './edit-home.service';

describe('EditHomeService', () => {
  let service: EditHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
