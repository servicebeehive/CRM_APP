import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/sharedmodule/confirm-password.validator';
import { UserDetail } from 'src/app/models/userdetail.model';
import { LoginService } from 'src/app/services/login/login.service';
import { ReturnResult } from 'src/app/models/return-result';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  forgotpwd = this.fb.group({
    username: ['', [Validators.required]],
    clientCode: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  },
    {
      validators: CustomValidators.passwordMatchValidator,
    }
  );

  public users: UserDetail[] = [];
  // public isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    public accountServices: AccountService,
    public router: Router,
    public fb: FormBuilder,
    public loginService: LoginService,
    public modalController: ModalController,
    public notificationService: NotificationService,
    public loaderService: LoaderService
  ) { }

  isDisplayed = false;

  public setInputFocus() {
    if (this.forgotpwd.value.username && this.forgotpwd.value.clientCode) {
      this.isDisplayed = true;
    } else {
      this.isDisplayed = false;
    }
  }

  public async onSubmit() {
    const userDetail = new UserDetail();
    userDetail.username = this.forgotpwd.value.username;
    userDetail.clientcode = this.forgotpwd.value.clientCode;
    userDetail.pwd = this.forgotpwd.value.password;
    userDetail.operationtype = 'FORGET';
    this.loginService
      .forgotPassword(userDetail)
      .then((result: ReturnResult<any>) => {
        if (result.success) {
          this.router.navigate(['/']);
          this.notificationService.showToast<any>(result);
        } else {
          this.notificationService.showToast<any>(result);
        }
      });
  }

  public cancel(): void {
    this.router.navigate(['/']);
  }
}
