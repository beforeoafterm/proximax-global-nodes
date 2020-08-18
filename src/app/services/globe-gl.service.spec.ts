import { TestBed } from '@angular/core/testing';

import { GlobeGlService } from './globe-gl.service';

describe('GlobeGlService', () => {
  let service: GlobeGlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobeGlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
