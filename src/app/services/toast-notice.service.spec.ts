import { TestBed } from '@angular/core/testing';

import { ToastNoticeService } from './toast-notice.service';

describe('ToastNoticeService', () => {
  let service: ToastNoticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastNoticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
