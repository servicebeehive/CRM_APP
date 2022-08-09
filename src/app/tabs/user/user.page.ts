import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReturnResult } from 'src/app/models/return-result';
import { UserDetail } from 'src/app/models/userdetail.model';
import { AccountService } from 'src/app/services/account/account.service';
import { LoginService } from 'src/app/services/login/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserDetailComponent } from './user-detail/user-detail.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public test = [1, 2, 3, 4];

  public users: UserDetail[] = [];

  constructor(
    public modalController: ModalController,
    public loginService: LoginService,
    public notificationService: NotificationService,
    public accountService: AccountService,
    public router: Router
  ) {}

  ngOnInit() {}

  public async ionViewDidEnter() {
    await this.getUsers();
  }

  public async onClickOpenModal() {
    const model = await this.modalController.create({
      component: UserDetailComponent,
    });
    model.onDidDismiss().then((res) => {
      if (res.data.loaddata) {
        this.getUsers();
      }
    });
    await model.present();
  }

  public getUsers() {
    const userDetail = new UserDetail();
    userDetail.operationtype = 'GETUSER';
    this.loginService
      .getUsers(userDetail)
      .then((result: ReturnResult<UserDetail[]>) => {
        if (result.success) {
          this.users = result.data;
        } else {
          this.notificationService.showToast<UserDetail[]>(result);
        }
      });
  }
}
