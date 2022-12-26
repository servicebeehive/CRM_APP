import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ReturnResult } from 'src/app/models/return-result';
import { AccountService } from 'src/app/services/account/account.service';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
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
  // public isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
    public assignmentService: AssignmentService,
    public notificationService: NotificationService,
    public accountServices: AccountService,
    public loaderService: LoaderService
  ) { }

  public async ionViewDidEnter() {
    await this.getTaskLog();
  }

  ngOnInit() { }

  public getTaskLog() {
    const operationtype = new OperationType();
    operationtype.operationtype = 'GETLOG';
    operationtype.taskid = this.taskDetails.taskid;
    operationtype.p_user = this.accountServices.USER_ID;
    this.assignmentService
      .getTaskDetails(operationtype)
      .then((result: ReturnResult<TaskDetail[]>) => {
        if (result.success) {
          this.assignedTaskDetails = result.data;
          // this.assignmentService.loader.next(false);
        } else {
          this.notificationService.showToast<TaskDetail[]>(result);
          // this.assignmentService.loader.next(false);
        }
      });
  }

  public dismiss(): void {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
