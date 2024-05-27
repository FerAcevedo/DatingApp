import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse )=> {
        
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modelStateErrors: any = [];
                
                 for (const key in err.error.errors) {
                   if(err.error.errors[key])
                     {
                       modelStateErrors.push(err.error.errors[key]);                
                     }
                 }
                throw modelStateErrors.flat();
              }
              else
              this.toastr.error(err.error, err.statusText);
              break;
              case 401: 
                this.toastr.error('Unauthorized', err.statusText);
              break;
              case 404: 
                this.router.navigateByUrl('/not-found');
              break;
              case 500: 
                const navigationExtras: NavigationExtras = {state: {error: err.error}};
                this.router.navigateByUrl('/server-error', navigationExtras);
              break;
  
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(err);
              break;
          }
        }
  
        return throwError(()=>err);
      })
    );
  }
}

/*import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse )=> {
      
      if (err) {
        switch (err.status) {
          case 400:
            if (err.error.errors) {
              const modelStateErrors = [];
              
              for (let index = 0; index < err.error.errors.length; index++) {
                if(err.error.errors[index])
                  modelStateErrors.push(err.error.errors[index]);
                
              }
              throw modelStateErrors;
            }
            else
            toastr.error(err.error, err.statusText);
            break;
            case 401: 
              toastr.error('Unauthorized', err.statusText);
            break;
            case 404: 
              router.navigateByUrl('/not-found');
            break;
            case 500: 
              const navigationExtras: NavigationExtras = {state: {error: err.error}};
              router.navigateByUrl('/server-error', navigationExtras);
            break;

          default:
            toastr.error('Something unexpected went wrong');
            console.log(err);
            break;
        }
      }

      return throwError(()=>err);
    })
  );

};
*/

