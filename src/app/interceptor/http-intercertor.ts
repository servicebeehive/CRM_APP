/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account/account.service';
import { LoaderService } from '../services/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpIntercertor implements HttpInterceptor {
  constructor(
    public accountSrvices: AccountService,
    private loaderService: LoaderService
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    const data = request.body;
    if (request.url.includes('login') || request.url.includes('forgotpassword')) {
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: data,
      });
      return next.handle(request).pipe(
        finalize(
          () => {
            this.loaderService.hide();
          }
        )
      );
    } else {
      const reqData = JSON.parse(data);
      const tokendata = {
        'x-access-token': this.accountSrvices.getToken(),
        uname: this.accountSrvices.USER_NAME,
        clientcode: this.accountSrvices.CLIENT_CODE
      };
      const body = {
        ...reqData,
        ...tokendata,
      };
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body,
      });
    }

    return next.handle(request).pipe(
      finalize(
        () => {
          this.loaderService.hide();
        }
      ),
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.body.tokenstatus !== undefined && !event.body.tokenstatus) {
              //If tokenstatus is failed then redirect to login page.
            }

          }
        },
        (err) => {
          //anything we want to do if we get an error response
        },
        () => {
          //It load on the success response of all api call
        }
      )
    );
  }
}

