import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ReturnResult } from 'src/app/models/return-result';
import { UserDetail } from 'src/app/models/userdetail.model';
import { LoginService } from 'src/app/services/login/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {

  public emailpattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

  addUserDetail = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10)],
    email: ['', [Validators.required, Validators.pattern(this.emailpattern)]],
    enable: [true],
  });

  constructor(
    public modalController: ModalController,
    public fb: FormBuilder,
    public notificationService: NotificationService,
    public loginService: LoginService
  ) {}

  ngOnInit() {}

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
    userDetail.operationtype = 'INSERT';
    this.loginService
      .getUsers(userDetail)
      .then((result: ReturnResult<UserDetail[]>) => {
        if (result.success) {
          this.modalController.dismiss({
            dismissed: true,
            loaddata: true,
          });
          this.notificationService.showToast<UserDetail[]>(result);
        } else {
          this.notificationService.showToast<UserDetail[]>(result);
        }
      });
  }
}
