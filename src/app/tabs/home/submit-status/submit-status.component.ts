import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { ReturnResult } from 'src/app/models/return-result';
import { AccountService } from 'src/app/services/account/account.service';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TaskAssignmnetModel } from '../../assignment/assignment.page';
import { TaskDetail } from '../../task/task.page';

interface Status {
  key: string;
  value: string;
}

@Component({
  selector: 'app-submit-status',
  templateUrl: './submit-status.component.html',
  styleUrls: ['./submit-status.component.scss'],
})
export class SubmitStatusComponent implements OnInit {
  public taskDetails: TaskDetail = this.navParams.get('value');

  status: Status[] = [
    {
      key: 'Open',
      value: 'open',
    },
    {
      key: 'In Progress',
      value: 'in progress',
    },
    {
      key: 'Resolved',
      value: 'resolved',
    },
    {
      key: 'Close',
      value: 'close',
    },
    {
      key: 'Customer Pending',
      value: 'customer pending',
    },
  ];

  addStatusDetail = this.fb.group({
    status: ['', Validators.required],
    remark: [''],
  });

  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public assignmentService: AssignmentService,
    public notificationService: NotificationService,
    public accountServices: AccountService
  ) {}

  ngOnInit() {}

  public onSubmitTaskStatus() {
    const taskAssign = new TaskAssignmnetModel();
    taskAssign.taskid = this.taskDetails.taskid;
    taskAssign.taskstatus = this.addStatusDetail.value.status;
    taskAssign.operationtype = 'STSUPD';
    taskAssign.remark = this.addStatusDetail.value.remark;
    taskAssign.taskassignee = this.accountServices.USER_ID;

    this.assignmentService
      .updateTaskDetails(taskAssign)
      .then((result: ReturnResult<any>) => {
        if (result.success) {
          this.notificationService.showToast<any>(result);
        } else {
          this.notificationService.showToast<any>(result);
        }
      });
  }

  public dismiss(): void {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
