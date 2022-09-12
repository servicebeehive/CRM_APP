import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controllers } from 'src/app/models/controllers';
import { IConfig } from 'src/app/models/iconfig';
import { LoginDetail } from 'src/app/models/logindetail.model';
import { ReturnResult } from 'src/app/models/return-result';
import { UserDetail } from 'src/app/models/userdetail.model';
import { TaskDetail } from 'src/app/tabs/task/task.page';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';
import { ConfigService } from '../config/config.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService {
  constructor(
    public httpClient: HttpClient,
    public controllers: Controllers,
    public config: ConfigService<IConfig>
  ) {
    super(httpClient, config.getSettingsObject().APIUrl);
  }

  public async postTaskDetail(
    taskDetailData: TaskDetail
  ): Promise<ReturnResult<string>> {
    return this.PostReturn<TaskDetail, ReturnResult<string>>(
      this.controllers.inserttask,
      taskDetailData
    );
  }

  public loader: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
}
