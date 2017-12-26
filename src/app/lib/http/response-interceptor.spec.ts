import { TestBed, inject } from '@angular/core/testing';

import { ResponseInterceptor } from './response-interceptor';

describe('ResponseInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponseInterceptor]
    });
  });

  it('should be created', inject([ResponseInterceptor], (service: ResponseInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
