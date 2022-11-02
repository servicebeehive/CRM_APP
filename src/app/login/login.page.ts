import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { DeviceDetails } from '../models/devicedetail';
import { LoginDetail } from '../models/logindetail.model';
import { ReturnResult } from '../models/return-result';
import { UserDetail } from '../models/userdetail.model';
import { AccountService } from '../services/account/account.service';
import { FcmService } from '../services/fcm/fcm.service';
import { LoaderService } from '../services/loader/loader.service';
import { LoginService } from '../services/login/login.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public brandUrl: string = "assets/icon/logo2.png"
  public companyUrl: string = "assets/icon/logo.png"
  public UniqueDeviceID: string;
  // public isLoading: Subject<boolean> = this.loaderService.isLoading;
  addloginDetail = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
    clientcode: ['', Validators.required]
  });

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public accountServices: AccountService,
    public notificationService: NotificationService,
    public loginService: LoginService,
    public alertCtrl: AlertController,
    public fcmService: FcmService,
    public loaderService: LoaderService
  ) { }

  onSignin() {
    const loginDetailData = new LoginDetail();
    loginDetailData.usercode = this.addloginDetail.value.username.trim();
    loginDetailData.pwd = this.addloginDetail.value.password;
    loginDetailData.clientcode = this.addloginDetail.value.clientcode;
    this.loginService
      .getUserDetails(loginDetailData)
      .then((result: ReturnResult<UserDetail>) => {
        if (result.success) {
          this.accountServices.setAccessToken(result.data);
          this.accountServices.USER_NAME = result.data.username;
          this.accountServices.USER_ID = result.data.userid;
          this.accountServices.USER_TYPE = result.data.usertype;
          this.accountServices.CLIENT_CODE = this.addloginDetail.value.clientcode;
          this.addloginDetail.reset();
          this.router.navigate(['tabs/home']);
          if (this.accountServices.DEVICE_TOKEN) {
            this.setDeviceToken(result.data);
          }
        } else {
          this.notificationService.showToast<UserDetail>(result);
        }
      });
  }

  public setDeviceToken(userDetailData: UserDetail): boolean {
    const deviceDetails = new DeviceDetails();
    deviceDetails.userid = userDetailData.userid,
      deviceDetails.username = userDetailData.username,
      deviceDetails.operationtype = "GETTOKEN"
    this.fcmService.getDeviceToken(deviceDetails).then(result => {
      this.accountServices.DEVICE_TOKEN_DETAILS = result.data;
      const index = this.accountServices.DEVICE_TOKEN_DETAILS.findIndex(value => value.devicetoken === this.accountServices.DEVICE_TOKEN);
      if (index < 0) {
        deviceDetails.userid = userDetailData.userid,
          deviceDetails.username = userDetailData.username,
          deviceDetails.operationtype = "INSERT",
          deviceDetails.emailaddress = userDetailData.email,
          deviceDetails.devicetoken = this.accountServices.DEVICE_TOKEN,
          deviceDetails.operatingsystem = "Android 12",
          deviceDetails.devicemodel = "One plus 10",
          deviceDetails.deviceid = "312323432532"
        this.fcmService.getDeviceToken(deviceDetails).then(result => {
        })
      }
    })
    return true;

  }


}


