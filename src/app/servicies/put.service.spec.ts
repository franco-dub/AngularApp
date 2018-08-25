import { TestBed, inject } from '@angular/core/testing';

import { PutService } from './put.service';

describe('PutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PutService]
    });
  });

  it('should be created', inject([PutService], (service: PutService) => {
    expect(service).toBeTruthy();
  }));
});
