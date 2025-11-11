import { TestBed } from '@angular/core/testing';

import { Servproyect } from './servproyect';

describe('Servproyect', () => {
  let service: Servproyect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servproyect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
