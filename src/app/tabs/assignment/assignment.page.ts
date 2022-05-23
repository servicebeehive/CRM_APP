import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ReturnResult } from 'src/app/models/return-result';
import { UserDetail } from 'src/app/models/userdetail.model';
import { AccountService } from 'src/app/services/account/account.service';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { LoginService } from 'src/app/services/login/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TaskDetail } from '../task/task.page';

export class OperationType {
  operationtype: string;
  taskid?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  p_user: number;
}

export class TaskAssignmnetModel {
  operationtype: string;
  taskid: number;
  taskstatus: string;
  remark: string;
  taskassignee: number;
}

interface User {
  id: number;
  first: string;
  last: string;
}

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage {
  public assignedTaskDetails: TaskDetail[] = [];

  public users: UserDetail[] = [];

  public assignmentForm = this.fb.group({
    assignTaskForm: this.fb.array([]),
  });

  constructor(
    public datepipe: DatePipe,
    public assignmentService: AssignmentService,
    public notificationService: NotificationService,
    public fb: FormBuilder,
    public loginService: LoginService,
    public accountServices: AccountService
  ) {}

  get formControl() {
    return this.assignmentForm.get('assignTaskForm') as FormArray;
  }

  public async ionViewDidEnter() {
    this.formControl.reset();
    await this.getTaskDetails();
    await this.getUsers();
  }

  public getTaskDetails() {
    const operationtype = new OperationType();
    operationtype.operationtype = 'ASSIGN';
    operationtype.p_user = this.accountServices.USER_ID;
    this.assignmentService
      .getTaskDetails(operationtype)
      .then((result: ReturnResult<TaskDetail[]>) => {
        if (result.success) {
          this.assignedTaskDetails = result.data;
          this.formControl.clear();
          this.assignedTaskDetails.forEach((element, i) => {
            this.formControl.push(
              this.fb.group({
                assigneeUser: [''],
                taskid: element.taskid,
                createdon: element.createdon,
                customername: element.customername,
                location: element.location,
                remark: element.remarks,
                status: element.status,
                fullname: element.fullname,
                index: [i],
              })
            );
          });
        } else {
          this.notificationService.showToast<TaskDetail[]>(result);
        }
      });
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

  onAssignUser(index) {
    const taskAssign = new TaskAssignmnetModel();
    taskAssign.taskid = (
      this.formControl.at(index).value as TaskAssignmnetModel
    ).taskid;
    taskAssign.taskstatus = 'open';
    taskAssign.operationtype = 'ASSIGN';
    taskAssign.remark = (
      this.formControl.at(index).value as TaskAssignmnetModel
    ).remark;
    taskAssign.taskassignee = this.formControl
      .at(index)
      .get('assigneeUser').value;

    this.assignmentService
      .updateTaskDetails(taskAssign)
      .then((result: ReturnResult<any>) => {
        if (result.success) {
          this.getTaskDetails();
          this.notificationService.showToast<any>(result);
        } else {
          this.notificationService.showToast<any>(result);
        }
      });
  }
}
