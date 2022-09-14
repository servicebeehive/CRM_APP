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
import { LoginService } from '../services/login/login.service';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { ReportService } from 'src/app/services/report/report.service';
import { TaskService } from 'src/app/services/task/task.service';

@Injectable({
  providedIn: 'root',
})
export class HttpIntercertor implements HttpInterceptor {
  constructor(
    public accountSrvices: AccountService,
    public loginService: LoginService,
    public assignmentService: AssignmentService,
    public reportService: ReportService,
    public taskService: TaskService
    ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const data = request.body;
    if (request.url.includes('login')) {
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: data,
      });
      this.loginService.isLoading.next(true);
      return next.handle(request).pipe(
        finalize(
          () => {
            this.loginService.isLoading.next(false);
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
      tap(
        (event: HttpEvent<any>) => {
          this.assignmentService.loader.next(true);
          this.reportService.loader.next(true);
          this.taskService.loader.next(true);
          this.loginService.isLoading.next(true);
          if (event instanceof HttpResponse) {
            if (
              event.body.tokenstatus !== undefined &&
              !event.body.tokenstatus
            ) {
              //If tokenstatus is failed then redirect to login page.
            }
            // this.assignmentService.loader.next(false);
            // this.reportService.loader.next(false);
            // this.taskService.loader.next(false);
            // this.loginService.isLoading.next(false);
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
  
