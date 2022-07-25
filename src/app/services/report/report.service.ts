import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Controllers } from 'src/app/models/controllers';
import { ConfigService } from '../config/config.service';
import { IConfig } from 'src/app/models/iconfig';
import { ReportData } from 'src/app/models/reportdata';
import { ReturnResult } from 'src/app/models/return-result';
import { LoginDetail } from 'src/app/models/logindetail.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  constructor(
    public httpClient: HttpClient,
    public controllers: Controllers,
    public config: ConfigService<IConfig>
  ) { 
    super(httpClient, config.getSettingsObject().APIUrl);
  }

  public async getReportData(
    loginDetailData: LoginDetail
  ): Promise<ReturnResult<ReportData>> {
    return this.PostReturn<LoginDetail, ReturnResult<ReportData>>(
      this.controllers.login,
      loginDetailData
    );
  }

  public async getReportType(
    reportDetailData: ReportData
  ): Promise<ReturnResult<ReportData[]>> {
    return this.PostReturn<ReportData, ReturnResult<ReportData[]>>(
      this.controllers.getreporttype,
      reportDetailData
    );
  }
}
