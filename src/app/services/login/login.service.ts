import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controllers } from 'src/app/models/controllers';
import { IConfig } from 'src/app/models/iconfig';
import { LoginDetail } from 'src/app/models/logindetail.model';
import { ReturnResult } from 'src/app/models/return-result';
import { UserDetail } from 'src/app/models/userdetail.model';
import { BaseService } from '../base/base.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  constructor(
    public httpClient: HttpClient,
    public controllers: Controllers,
    public config: ConfigService<IConfig>
  ) {
    super(httpClient, config.getSettingsObject().APIUrl);
  }

  public async getUserDetails(
    loginDetailData: LoginDetail
  ): Promise<ReturnResult<UserDetail>> {
    return this.PostReturn<LoginDetail, ReturnResult<UserDetail>>(
      this.controllers.login,
      loginDetailData
    );
  }

  public async getUsers(
    userDetailData: UserDetail
  ): Promise<ReturnResult<UserDetail[]>> {
    return this.PostReturn<UserDetail, ReturnResult<UserDetail[]>>(
      this.controllers.getuserdetails,
      userDetailData
    );
  }

  public async forgotPassword(
    userDetailData: UserDetail
  ): Promise<ReturnResult<UserDetail[]>> {
    return this.PostReturn<UserDetail, ReturnResult<UserDetail[]>>(
      this.controllers.forgotpassword,
      userDetailData
    );
  }
}
