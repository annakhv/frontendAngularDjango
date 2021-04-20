import { TestBed } from '@angular/core/testing';

import { HomepostsService } from './homeposts.service';

describe('HomepostsService', () => {
  let service: HomepostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomepostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
