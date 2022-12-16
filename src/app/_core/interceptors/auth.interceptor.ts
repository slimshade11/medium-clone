import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACCESSTOKEN } from '@core/constants/access-token';
import { PersistanceService } from '@core/services/persistance.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistanceService: PersistanceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.persistanceService.get(ACCESSTOKEN);

    request = request.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : '',
      },
    });

    return next.handle(request);
  }
}
