import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(
    public accountServices: AccountService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  public onClickLogout() {
    this.accountServices.removeToken();
    this.router.navigate(['/']);
  }

}
