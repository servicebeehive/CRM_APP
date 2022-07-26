import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Controllers } from 'src/app/models/controllers';
import { ConfigService } from '../config/config.service';
import { IConfig } from 'src/app/models/iconfig';
import { ReportData } from 'src/app/models/reportdata';
import { ReturnResult } from 'src/app/models/return-result';

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
    reportDetailData: ReportData
  ): Promise<ReturnResult<string>> {
    return this.PostReturn<ReportData, ReturnResult<string>>(
      this.controllers.getreportdata,
      reportDetailData
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
