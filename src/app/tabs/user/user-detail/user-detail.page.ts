import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { ReturnResult } from 'src/app/models/return-result';
import { UserDetail } from 'src/app/models/userdetail.model';
import { LoginService } from 'src/app/services/login/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage {

  public emailpattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

  public userDetail = this.navParams.get('userDetail');

  addUserDetail = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    phoneno: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10)]],
    emailid: ['', [Validators.required, Validators.pattern(this.emailpattern)]],
    enable: [true]
  });

  constructor(
    public modalController: ModalController,
    public fb: FormBuilder,
    public notificationService: NotificationService,
    public loginService: LoginService,
    public accountServices: AccountService,
    public navParams: NavParams,
  ) { }

  public async ionViewDidEnter() {
    if (this.userDetail) {
      this.addUserDetail.controls.firstName.setValue(this.userDetail.fullname.split(" ",1));
      this.addUserDetail.controls.lastName.setValue(this.userDetail.fullname.trim().split(" ").slice(-1));
      this.addUserDetail.controls.userName.setValue(this.userDetail.username);
      this.addUserDetail.controls.password.setValue(this.userDetail.pwd);
      this.addUserDetail.controls.phoneno.setValue(this.userDetail.phone);
      this.addUserDetail.controls.emailid.setValue(this.userDetail.email);
      this.addUserDetail.controls.enable.setValue(this.userDetail.active);
    }
  }

  public dismiss(): void {
    this.modalController.dismiss({
      dismissed: true,
      loaddata: false,
    });
  }

  public onSubmitUser(): void {
    const userDetail = new UserDetail();
    userDetail.fullname =
      this.addUserDetail.value.firstName.trim() +
      ' ' +
      this.addUserDetail.value.lastName.trim();
    userDetail.username = this.addUserDetail.value.userName.trim();
    userDetail.pwd = this.addUserDetail.value.password.trim();
    userDetail.active = this.addUserDetail.value.enable ? 'y' : 'n';
    userDetail.email = this.addUserDetail.value.emailid;
    userDetail.phone = this.addUserDetail.value.phoneno;
    userDetail.operationtype = this.userDetail ? 'INSERT' : 'UPDATE';
    this.loginService
      .getUsers(userDetail)
      .then((result: ReturnResult<UserDetail[]>) => {
        if (result.success) {
          this.modalController.dismiss({
            dismissed: true,
            loaddata: true,
          });
          this.notificationService.showToast<UserDetail[]>(result);
          this.loginService.isLoading.next(false);
        } else {
          this.notificationService.showToast<UserDetail[]>(result);
          this.loginService.isLoading.next(false);
        }
      });
  }

}
