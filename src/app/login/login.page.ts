import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginDetail } from '../models/logindetail.model';
import { ReturnResult } from '../models/return-result';
import { UserDetail } from '../models/userdetail.model';
import { AccountService } from '../services/account/account.service';
import { LoginService } from '../services/login/login.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public brandUrl:string="assets/icon/logo.png"
  addloginDetail = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
    clientcode: ['', Validators.required]
  });

  isLoading = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public accountServices: AccountService,
    public notificationService: NotificationService,
    public loginService: LoginService,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onSignin() {
    this.isLoading = true;
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
          this.isLoading = false;
        } else {
          this.notificationService.showToast<UserDetail>(result);
          this.isLoading = false;
        }
      });
  }
}
