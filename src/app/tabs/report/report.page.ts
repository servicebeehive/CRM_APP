import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetail } from 'src/app/models/userdetail.model';
import { LoginService } from 'src/app/services/login/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ReturnResult } from 'src/app/models/return-result';
import { ReportData } from 'src/app/models/reportdata';
import { ReportType } from 'src/app/models/reporttype';
import { ReportService } from 'src/app/services/report/report.service';
import { AlertController, IonPopover } from '@ionic/angular';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

interface Status {
  key: string;
  value: string;
}

export class ReportModel {
  userid: number;
  startdate: Date;
  enddate: Date;
  status: string;
  taskassignee: string;
  reporttypecode: string;
  taskid: number;
  taskdate: Date;
  customername: string;
  location: string;
  phone: number;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})

export class ReportPage implements OnInit {

  @ViewChild('ionPopover1') public ionPopover1: IonPopover;
  @ViewChild('ionPopover2') public ionPopover2: IonPopover;

  public users: UserDetail[] = [];
  public report: ReportType[] = [];
  public reportData: ReportData[] = [];
  // public isLoading: Subject<boolean> = this.loaderService.isLoading;
  status: Status[] = [];

  constructor(
    public accountServices: AccountService,
    public datepipe: DatePipe,
    public _http: HttpClient,
    public loginService: LoginService,
    public notificationService: NotificationService,
    public router: Router,
    public reportService: ReportService,
    public alertCtrl: AlertController,
    public loaderService: LoaderService
  ) { }

  addReport = new FormGroup({
    fromdate: new FormControl('', Validators.required),
    todate: new FormControl('', Validators.required),
    status: new FormControl(''),
    taskassignee: new FormControl(''),
    reporttypecode: new FormControl('', Validators.required)
  });

  get fromdate() {
    return this.addReport.get('fromdate');
  }
  get todate() {
    return this.addReport.get('todate');
  }

  ngOnInit() {
    this.status = [
      {
        key: 'Open',
        value: 'open',
      },
      {
        key: 'In Progress',
        value: 'in progress',
      },
      {
        key: 'Engineer Assigned',
        value: 'engineer assigned',
      },
      {
        key: 'Customer Pending',
        value: 'customer pending',
      },
      {
        key: 'Resolved',
        value: 'resolved',
      },
      {
        key: 'Close',
        value: 'close',
      },
    ];
  }

  public async ionViewDidEnter() {
    this.addReport.reset();
    this.reportData = [];
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

  public getReportType() {
    const reportType = new ReportType();
    this.reportService
      .getReportType(reportType)
      .then((result: ReturnResult<ReportType[]>) => {
        if (result.success) {
          this.report = result.data;
          // this.reportService.loader.next(false);
        } else {
          this.notificationService.showToast<ReportType[]>(result);
          // this.reportService.loader.next(false);
        }
      });
  }

  public async onReportData() {
    const reportModel = new ReportModel();
    reportModel.startdate = this.addReport.value.fromdate;
    reportModel.enddate = this.addReport.value.todate;
    reportModel.status = !this.addReport.value.status ? null : this.addReport.value.status;
    reportModel.reporttypecode = this.addReport.value.reporttypecode;
    if (this.accountServices.USER_TYPE === 'admin') {
      reportModel.taskassignee = !this.addReport.value.taskassignee ? null : this.addReport.value.taskassignee;
    } else {

      reportModel.taskassignee = String(this.accountServices.USER_ID);
    }
    this.reportService
      .getReportData(reportModel)
      .then((result: ReturnResult<ReportData[]>) => {
        if (reportModel.startdate > reportModel.enddate) {
          this.alertCtrl
            .create({
              message:
                'End Date must be greater than Start Date',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.addReport.reset();
                    this.reportData = [];
                  },
                },
              ],
            }).then((res) => {
              res.present();
            });
        }
        else if (result.success) {
          this.reportData = result.data;
          // this.reportService.loader.next(false);
        } else {
          this.notificationService.showToast<ReportData[]>(result);
          // this.reportService.loader.next(false);
        }
      });
  }

  onReset() {
    this.addReport.reset();
    this.reportData = [];
  }

  onPopoverClick() {
    this.ionPopover1.dismiss();
    this.ionPopover2.dismiss();
  }

}
