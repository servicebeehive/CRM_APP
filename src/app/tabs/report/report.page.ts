import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(
    public accountServices: AccountService,
    public _http: HttpClient,
    public router: Router
  ) { }
  addReport = new FormGroup({
    fromdate: new FormControl('',Validators.required),
    todate: new FormControl('',Validators.required)
  });
  get fromdate(){
    return this.addReport.get('fromdate');
  }
  get todate(){
    return this.addReport.get('todate');
  }
  genReport(){
    this._http.get<any>("http://localhost:3000/CRM_APP", this.addReport.value)
    .subscribe(res=>{
       alert("okay");
    })
  }
  ngOnInit() {
  }
  public onClickLogout() {
    this.accountServices.removeToken();
    this.router.navigate(['/']);
  }

}
