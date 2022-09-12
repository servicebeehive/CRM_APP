import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controllers } from 'src/app/models/controllers';
import { IConfig } from 'src/app/models/iconfig';
import { ReturnResult } from 'src/app/models/return-result';
import {
  OperationType,
  TaskAssignmnetModel,
} from 'src/app/tabs/assignment/assignment.page';
import { TaskDetail } from 'src/app/tabs/task/task.page';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';
import { ConfigService } from '../config/config.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService extends BaseService {
  constructor(
    public httpClient: HttpClient,
    public controllers: Controllers,
    public config: ConfigService<IConfig>
  ) {
    super(httpClient, config.getSettingsObject().APIUrl);
  }

  public async getTaskDetails(
    operationtype: OperationType
  ): Promise<ReturnResult<TaskDetail[]>> {
    return this.PostReturn<OperationType, ReturnResult<TaskDetail[]>>(
      this.controllers.gettaskdetails,
      operationtype
    );
  }

  public async updateTaskDetails(
    taskAssignmnetModelData: TaskAssignmnetModel
  ): Promise<ReturnResult<any>> {
    return this.PostReturn<TaskAssignmnetModel, ReturnResult<any>>(
      this.controllers.updatetaskdetails,
      taskAssignmnetModelData
    );
  }

  public loader: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
}
