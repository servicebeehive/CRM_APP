import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetail } from 'src/app/models/userdetail.model';
import { LoginService } from 'src/app/services/login/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ReturnResult } from 'src/app/models/return-result';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  public Test:string='Report'
  public users: UserDetail[] = [];
  constructor(
    public accountServices: AccountService,
    public _http: HttpClient,
    public loginService: LoginService,
    public assignmentService: AssignmentService,
    public notificationService: NotificationService,
    public router: Router
  ) { }

  addReport = new FormGroup({
    fromdate: new FormControl('',Validators.required),
    todate: new FormControl('',Validators.required)
  });
  get fromdate(){
    return this.addReport.get('fromdate');
  }
  get todate(){
    return this.addReport.get('todate');
  }
  ngOnInit() {}

  public async ionViewDidEnter() {
    await this.getUsers();
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
