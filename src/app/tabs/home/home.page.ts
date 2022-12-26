import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ReturnResult } from 'src/app/models/return-result';
import { AccountService } from 'src/app/services/account/account.service';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
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
  public assignedTaskDetails: TaskDetail[] = [];
  // public isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    public datepipe: DatePipe,
    public modalController: ModalController,
    public assignmentService: AssignmentService,
    public notificationService: NotificationService,
    public accountServices: AccountService,
    public router: Router,
    public loaderService: LoaderService
  ) { }

  ngOnInit() { }

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
    model.onDidDismiss().then((res) => {
      if (res.data.loaddata) {
        this.getAssignedTask();
      }
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
}
