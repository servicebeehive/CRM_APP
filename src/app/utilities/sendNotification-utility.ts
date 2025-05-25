import { Injectable } from '@angular/core';
import { DeviceDetails } from '../models/devicedetail';
import { NotificationDetail } from '../models/notification.model';
import { ReturnResult } from '../models/return-result';
import { UserDetail } from '../models/userdetail.model';
import { FcmService } from '../services/fcm/fcm.service';
import { NotificationService } from '../services/notification/notification.service';

@Injectable({
    providedIn: 'root'
})


export class SendNotificationUtility {

    constructor(public fcmService: FcmService, public notificationService: NotificationService) { }


    public sendNotification(userDetailData: UserDetail, notificationDetail: NotificationDetail): ReturnResult<any> {
        let deviceTokens: DeviceDetails[] = [];
        const deviceDetails = new DeviceDetails();
        deviceDetails.userid = userDetailData.userid,
            deviceDetails.username = userDetailData.username,
            deviceDetails.operationtype = 'GETTOKEN';
        this.fcmService.getDeviceToken(deviceDetails).then(result => {
            deviceTokens = result.data;
            if (deviceTokens.length > 0) {
                for (let i = 0; i < deviceTokens.length; i++) {
                    notificationDetail.userFcmToken = deviceTokens[i].devicetoken;
                    this.fcmService.sendNotification(notificationDetail).then(result => {
                        if (result.success) {
                        }
                    });
                }
            }
        });
        return;
    }

}

