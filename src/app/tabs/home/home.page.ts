import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReturnResult } from 'src/app/models/return-result';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { OperationType } from '../assignment/assignment.page';
import { TaskDetail } from '../task/task.page';
import { DisplayStatusComponent } from './display-status/display-status.component';
import { SubmitStatusComponent } from './submit-status/submit-status.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public test = [1, 2, 3, 4];
  public date = new Date();

  public assignedTaskDetails: TaskDetail[] = [];

  constructor(
    public datepipe: DatePipe,
    public modalController: ModalController,
    public assignmentService: AssignmentService,
    public notificationService: NotificationService
  ) {}

  ngOnInit() {}

  public async ionViewDidEnter() {
    await this.getAssignedTask();
  }

  public async onClickSubmitStatus(item: TaskDetail) {
    const model = await this.modalController.create({
      component: SubmitStatusComponent,
      componentProps: {
        value: item,
      },
    });
    await model.present();
  }

  public async onClickDisplayStatus(item: TaskDetail) {
    const model = await this.modalController.create({
      component: DisplayStatusComponent,
      componentProps: {
        value: item,
      },
    });
    await model.present();
  }

  public getAssignedTask() {
    const operationtype = new OperationType();
    operationtype.operationtype = 'HOME';
    this.assignmentService
      .getTaskDetails(operationtype)
      .then((result: ReturnResult<TaskDetail[]>) => {
        if (result.success) {
          this.assignedTaskDetails = result.data;
        } else {
          this.notificationService.showToast<TaskDetail[]>(result);
        }
      });
  }
}
