import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/sharedmodule/confirm-password.validator';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/models/userdetail.model';
import { ReturnResult } from 'src/app/models/return-result';
import { LoginService } from 'src/app/services/login/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {

  public userDetail = this.navParams.get('userDetail');

  constructor(
    public accountServices: AccountService,
    public router: Router,
    public modalController: ModalController,
    public fb: FormBuilder,
    public navParams: NavParams,
    public loginService: LoginService,
    public notificationService: NotificationService
  ) { }

  changepwd = this.fb.group({
    oldpwd: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  },
    {
      validators: CustomValidators.passwordMatchValidator,
    }
  );

  public dismiss(): void {
    this.modalController.dismiss({
      dismissed: true,
      loaddata: false,
    });
  }


  public async onSubmitChangePassword() {
    const userDetail = new UserDetail();
    userDetail.username = this.userDetail.username;
    userDetail.oldpwd = this.changepwd.value.oldpwd;
    userDetail.pwd = this.changepwd.value.confirmPassword;
    userDetail.operationtype = 'CHANGE';
    this.loginService
      .getUsers(userDetail)
      .then((result: ReturnResult<any>) => {
        if (result.success) {
          this.notificationService.showToast<any>(result);
        } else {
          this.notificationService.showToast<any>(result);
        }
        this.dismiss();
      });
  }

}
