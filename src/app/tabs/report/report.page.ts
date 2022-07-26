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
import { ReportData } from 'src/app/models/reportdata';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  public Test:string='Report'
  public users: UserDetail[] = [];
  public report: ReportData[] = [];

  constructor(
    public accountServices: AccountService,
    public _http: HttpClient,
    public loginService: LoginService,
    public assignmentService: AssignmentService,
    public notificationService: NotificationService,
    public router: Router,
    public reportService: ReportService
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
    await this.getReportType();
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

  public getReportType(){
    const reportData = new ReportData();
    reportData.reporttypecode = 'GETREPORTTYPE';
    this.reportService
      .getReportType(reportData)
      .then((result: ReturnResult<ReportData[]>) => {
        if(result.success) {
          this.report = result.data;
        } else {
          this.notificationService.showToast<ReportData[]>(result);
        }
      });
  }
}
