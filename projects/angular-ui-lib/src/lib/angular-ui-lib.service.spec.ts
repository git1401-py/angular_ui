import { TestBed } from '@angular/core/testing';

import { AngularUiLibService } from './angular-ui-lib.service';

describe('AngularUiLibService', () => {
  let service: AngularUiLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularUiLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
