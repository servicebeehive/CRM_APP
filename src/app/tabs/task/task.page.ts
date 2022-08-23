import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ReturnResult } from 'src/app/models/return-result';
import { AccountService } from 'src/app/services/account/account.service';
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
  color:string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  addTaskDetail = this.fb.group({
    customerName: ['', Validators.required],
    location: ['', Validators.required],
    remark: [''],
    phoneNumber: ['', [Validators.minLength(10)]],
  });

  constructor(
    public fb: FormBuilder,
    public taskService: TaskService,
    public notificationService: NotificationService,
    public accountService: AccountService,
    public router: Router,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  public async onTaskAdd() {
    const taskDetail = new TaskDetail();
    taskDetail.customername = this.addTaskDetail.value.customerName;
    taskDetail.location = this.addTaskDetail.value.location;
    taskDetail.phone = this.addTaskDetail.value.phoneNumber;
    taskDetail.remarks = this.addTaskDetail.value.remark;

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
                  } else {
                    this.notificationService.showToast<string>(result);
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
