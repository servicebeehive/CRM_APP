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
  addloginDetail = this.fb.group({
    username: ['chittaranjan', [Validators.required]],
    password: ['cd', Validators.required],
  });

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public accountServices: AccountService,
    public notificationService: NotificationService,
    public loginService: LoginService,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  public ionViewDidEnter() {
    this.addloginDetail.reset();
  }

  onSignin() {
    const loginDetailData = new LoginDetail();
    loginDetailData.usercode = this.addloginDetail.value.username.trim();
    loginDetailData.pwd = this.addloginDetail.value.password;
    loginDetailData.logintype = '';
    this.loginService
      .getUserDetails(loginDetailData)
      .then((result: ReturnResult<UserDetail>) => {
        if (result.success) {
          this.accountServices.setAccessToken(result.data);
          this.accountServices.USER_NAME = result.data.username;
          this.accountServices.USER_ID = result.data.userid;
          this.accountServices.USER_TYPE = result.data.usertype;
          this.addloginDetail.reset();
          this.router.navigate(['tabs/home']);
        } else {
          this.notificationService.showToast<UserDetail>(result);
        }
      });
  }
}
