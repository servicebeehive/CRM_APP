import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ReturnResult } from 'src/app/models/return-result';
import { AccountService } from 'src/app/services/account/account.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TaskService } from 'src/app/services/task/task.service';

export class TaskDetail {
  taskid: number;
  customername: string;
  location: string;
  remarks: string;
  phone: number;
  status: string;
  fullname: string;
  createdon: string;
  assignedto: string;
  servicetype: string;
  producttype: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  // public isLoading: Subject<boolean> = this.loaderService.isLoading;

  addTaskDetail = this.fb.group({
    customerName: ['', Validators.required],
    location: ['', Validators.required],
    remark: [''],
    phoneNumber: ['', [Validators.minLength(10)]],
    servicetype: [''],
    producttype: ['']
  });

  constructor(
    public fb: FormBuilder,
    public taskService: TaskService,
    public notificationService: NotificationService,
    public accountService: AccountService,
    public router: Router,
    public alertCtrl: AlertController,
    public loaderService: LoaderService
  ) { }

  ngOnInit() { }

  public async onTaskAdd() {
    const taskDetail = new TaskDetail();
    taskDetail.customername = this.addTaskDetail.value.customerName;
    taskDetail.location = this.addTaskDetail.value.location;
    taskDetail.phone = this.addTaskDetail.value.phoneNumber;
    taskDetail.remarks = this.addTaskDetail.value.remark;
    taskDetail.servicetype = this.addTaskDetail.value.servicetype;
    taskDetail.producttype = this.addTaskDetail.value.producttype;

    this.alertCtrl
      .create({
        header: 'Confirm Alert',
        subHeader: 'Are you sure you want to submit?',
        message:
          'After Submit, Task is displayed in Admin Panel to assign Engineer.',
        buttons: [
          {
            text: 'Cancel',
          },
          {
            text: 'Ok',
            handler: () => {
              this.taskService
                .postTaskDetail(taskDetail)
                .then((result: ReturnResult<string>) => {
                  if (result.success) {
                    this.notificationService.showToast<string>(result);
                    this.addTaskDetail.reset();
                    // this.taskService.loader.next(false);
                  } else {
                    this.notificationService.showToast<string>(result);
                    // this.taskService.loader.next(false);
                  }
                });
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  public onClearForm() {
    this.addTaskDetail.reset();
  }
}
