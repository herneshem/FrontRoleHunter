import { TestBed } from '@angular/core/testing';

import { Servform } from './servform';

describe('Servform', () => {
  let service: Servform;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servform);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
