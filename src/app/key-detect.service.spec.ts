import { TestBed } from '@angular/core/testing';

import { KeyDetectService } from './key-detect.service';

describe('KeyDetectService', () => {
  let service: KeyDetectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyDetectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
