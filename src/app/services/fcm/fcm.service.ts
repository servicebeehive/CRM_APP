import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controllers } from 'src/app/models/controllers';
import { DeviceDetails } from 'src/app/models/devicedetail';
import { IConfig } from 'src/app/models/iconfig';
import { NotificationDetail } from 'src/app/models/notification.model';
import { ReturnResult } from 'src/app/models/return-result';
import { BaseService } from '../base/base.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService extends BaseService {

  constructor(public httpClient: HttpClient,
    public controllers: Controllers,
    public config: ConfigService<IConfig>) {
    super(httpClient, config.getSettingsObject().APIUrl);
  }


  public async getDeviceToken(
    deviceDetailData: DeviceDetails
  ): Promise<ReturnResult<DeviceDetails[]>> {
    return this.PostReturn<DeviceDetails, ReturnResult<DeviceDetails[]>>(
      this.controllers.getdevicetoken,
      deviceDetailData
    );
  }

  public async sendNotification(
    notificationDetailData: NotificationDetail
  ): Promise<ReturnResult<any>> {
    return this.PostReturn<any, ReturnResult<any>>(
      this.controllers.notification,
      notificationDetailData
    );
  }


}
