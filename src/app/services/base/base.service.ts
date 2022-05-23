/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
export abstract class BaseService {
  protected constructor(
    public httpClient: HttpClient,
    public BaseUrl: string
  ) {}

  public async PostReturn<T, U>(controllerInfo: string, info: T): Promise<U> {
    const requestInfo = JSON.stringify(info);
    return await this.httpClient
      .post<U>(this.BaseUrl + controllerInfo, requestInfo, {
        headers: new HttpHeaders().set('content-type', 'application/json'),
      })
      .toPromise();
  }

  public async Post<U>(controllerInfo: string): Promise<U> {
    return await this.httpClient
      .post<U>(this.BaseUrl + controllerInfo, {
        headers: new HttpHeaders().set('content-type', 'application/json'),
      })
      .toPromise();
  }

  public PostPayment<T>(controllerInfo: string, info: T): Promise<string> {
    const requestInfo = JSON.stringify(info);
    return this.httpClient
      .post(this.BaseUrl + controllerInfo, requestInfo, {
        responseType: 'text',
      })
      .toPromise();
  }

  public async Get<U>(controllerInfo: string): Promise<U> {
    return await this.httpClient
      .get<U>(this.BaseUrl + controllerInfo, {
        headers: new HttpHeaders().set('content-type', 'application/json'),
      })
      .toPromise();
  }

  public async GetWithValue<U>(
    controllerInfo: string,
    Value: number
  ): Promise<U> {
    return await this.httpClient
      .get<U>(this.BaseUrl + controllerInfo + `/${Value}`, {
        headers: new HttpHeaders().set('content-type', 'application/json'),
      })
      .toPromise();
  }

  public async Put<T, U>(controllerInfo: string, info: T): Promise<U> {
    const requestInfo = JSON.stringify(info);
    return await this.httpClient
      .put<U>(this.BaseUrl + controllerInfo, requestInfo, {
        headers: new HttpHeaders().set('content-type', 'application/json'),
      })
      .toPromise();
  }

  public async Delete<U>(controllerInfo: string, RowId: number): Promise<U> {
    return await this.httpClient
      .delete<U>(this.BaseUrl + controllerInfo + `?Id=${RowId}`, {
        headers: new HttpHeaders().set('content-type', 'application/json'),
      })
      .toPromise();
  }
}
