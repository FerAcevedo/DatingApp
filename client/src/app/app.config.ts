import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared.module';
import { errorInterceptorProvider } from './_providers/errorInterceptorProvider';

export const appConfig: ApplicationConfig = {
  providers: [
    //provideHttpClient(withInterceptors([ErrorInterceptor])),
    errorInterceptorProvider,
    provideRouter(routes), 
    provideClientHydration(), 
    importProvidersFrom(
      CommonModule, 
      HttpClientModule, 
      BrowserAnimationsModule, 
      SharedModule
      )
  ]
   };
