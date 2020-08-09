import { TestBed } from '@angular/core/testing';

import { VariaveisGlobaisService } from './variaveis-globais.service';

describe('VariaveisGlobaisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VariaveisGlobaisService = TestBed.get(VariaveisGlobaisService);
    expect(service).toBeTruthy();
  });
});
