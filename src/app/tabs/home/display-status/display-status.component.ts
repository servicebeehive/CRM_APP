import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ReturnResult } from 'src/app/models/return-result';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { OperationType } from '../../assignment/assignment.page';
import { TaskDetail } from '../../task/task.page';

@Component({
  selector: 'app-display-status',
  templateUrl: './display-status.component.html',
  styleUrls: ['./display-status.component.scss'],
})
export class DisplayStatusComponent implements OnInit {
  public assignedTaskDetails: TaskDetail[] = [];
  public taskDetails: TaskDetail = this.navParams.get('value');

  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
    public assignmentService: AssignmentService,
    public notificationService: NotificationService
  ) {}

  public async ionViewDidEnter() {
    await this.getTaskLog();
  }

  ngOnInit() {}

  public getTaskLog() {
    const operationtype = new OperationType();
    operationtype.operationtype = 'GETLOG';
    operationtype.taskid = this.taskDetails.taskid;
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

  public dismiss(): void {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
