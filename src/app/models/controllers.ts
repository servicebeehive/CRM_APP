import { Injectable } from '@angular/core';

@Injectable()
export class Controllers {
  public readonly login = '/api/v1/login';
  public readonly inserttask = `/api/v1/inserttask`;
  public readonly gettaskdetails = `/api/v1/gettaskdetails`;
  public readonly updatetaskdetails = `/api/v1/updatetaskdetails`;
  public readonly getuserdetails = `/api/v1/getuserdetails`;
}
