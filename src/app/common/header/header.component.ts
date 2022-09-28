import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() header : string;

  constructor(
    public accountServices: AccountService,
    public router: Router
    ) { }

  ngOnInit() {}
  public onClickLogout() {
    this.accountServices.removeToken();
    this.router.navigate(['/']);
  }
}
