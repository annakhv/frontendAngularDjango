import { TestBed } from '@angular/core/testing';

import { AllUserActivityService } from './all-user-activity.service';

describe('AllUserActivityService', () => {
  let service: AllUserActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllUserActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
