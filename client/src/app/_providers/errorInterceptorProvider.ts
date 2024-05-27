import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '../_interceptors/error.interceptor';

/** Provider for the Noop Interceptor. */
export const errorInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true };