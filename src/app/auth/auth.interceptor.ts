import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { TokenService } from '../services/token.service';
import { TransferService } from '../services/transfer.service';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private token: TokenService,
    private loadingService: TransferService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    this.totalRequests++;
    this.loadingService.loadingSpinner.next(true);
    return next.handle(authReq).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0){
          this.loadingService.loadingSpinner.next(false);
        }
      })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
