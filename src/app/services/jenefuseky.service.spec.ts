import { TestBed } from '@angular/core/testing';

import { JenefusekyService } from './jenefuseky.service';

describe('JenefusekyService', () => {
  let service: JenefusekyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JenefusekyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
