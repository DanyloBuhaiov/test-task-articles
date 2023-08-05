import { TestBed } from '@angular/core/testing';

import { OpenedItemService } from './opened-item.service';

describe('OpenedItemService', () => {
  let service: OpenedItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenedItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
