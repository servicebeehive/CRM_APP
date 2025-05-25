import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetail } from 'src/app/models/userdetail.model';
import { LoginService } from 'src/app/services/login/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ReturnResult } from 'src/app/models/return-result';
import { ReportService } from 'src/app/services/report/report.service';
import { AlertController, IonPopover } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ModalController } from '@ionic/angular';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { TaskDetail } from 'src/app/tabs/task/task.page';

interface Status {
  key: string;
  value: string;
}

export class ReportModel {
  startdate: Date;
  enddate: Date;
  status: string;
  taskassignee: string;
  customername: string;
  servicetype: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})


export class FilterPage implements OnInit {

  @ViewChild('ionPopover1') public ionPopover1: IonPopover;
  @ViewChild('ionPopover2') public ionPopover2: IonPopover;

  public users: UserDetail[] = [];
  public assignedTaskDetails: TaskDetail[] = [];
  public arrays: TaskDetail[] = [];
  status: Status[] = [];
  newArray: any = [];
  tempArray: any = [];

  constructor(
    public accountServices: AccountService,
    public datepipe: DatePipe,
    public _http: HttpClient,
    public loginService: LoginService,
    public notificationService: NotificationService,
    public router: Router,
    public reportService: ReportService,
    public assignmentService: AssignmentService,
    public alertCtrl: AlertController,
    public loaderService: LoaderService,
    public modalController: ModalController
  ) { }

  filterData = new FormGroup({
    fromdate: new FormControl(''),
    todate: new FormControl(''),
    status: new FormControl(''),
    taskassignee: new FormControl(''),
    customername: new FormControl(''),
    servicetype: new FormControl('')
  });

  get fromdate() {
    return this.filterData.get('fromdate');
  }
  get todate() {
    return this.filterData.get('todate');
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
    this.filterData.reset();
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

  public async onFilterData() {
    const reportModel = new ReportModel();
    reportModel.startdate = !this.filterData.value.fromdate ? null : this.filterData.value.fromdate;
    reportModel.enddate = !this.filterData.value.todate ? null : this.filterData.value.todate;
    reportModel.status = !this.filterData.value.status ? null : this.filterData.value.status;
    reportModel.taskassignee = !this.filterData.value.taskassignee ? null : this.filterData.value.taskassignee;
    reportModel.servicetype = !this.filterData.value.servicetype ? null : this.filterData.value.servicetype;
      if(reportModel.startdate || reportModel.enddate || reportModel.status || reportModel.customername || reportModel.taskassignee){
        //  this.newArray = this.assignedTaskDetails.filter(x => x.status === this.filterData.value.status);
       //   this.assignedTaskDetails = this.assignedTaskDetails.filter(x => x.customername === this.filterData.value.customername);
        //  this.assignedTaskDetails = this.assignedTaskDetails.filter(x => x.assignedto === this.filterData.value.taskassignee);
        //  this.assignedTaskDetails = this.assignedTaskDetails.filter(x => x.servicetype === this.filterData.value.servicetype);
        this.tempArray = this.arrays.filter((e) => e.status.includes(this.filterData.value.status));
        this.assignedTaskDetails = [];
        this.newArray.push(this.tempArray);
        console.log(this.filterData.value.status);
        console.log(this.newArray);
        this.modalController.dismiss({
          dismissed: true,
          loaddata: false,
        });
      }
      else{
        this.modalController.dismiss({
          dismissed: true,
          loaddata: false,
        });
      }
    }

  onCancel() {
    this.modalController.dismiss({
      dismissed: true,
      loaddata: false,
    });
  }

  onPopoverClick() {
    this.ionPopover1.dismiss();
    this.ionPopover2.dismiss();
  }

}
