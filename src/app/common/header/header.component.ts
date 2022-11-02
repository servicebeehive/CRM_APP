import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterPage } from 'src/app/filter/filter.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() header : string;

  constructor(
    public accountServices: AccountService,
    public router: Router,
    public modalController: ModalController
    ) { }

  ngOnInit() {}
  public onClickLogout() {
    this.accountServices.removeToken();
    this.router.navigate(['/']);
  }

  public async onClickOpenModel(){
    const model = await this.modalController.create({
      component: FilterPage,
    });
    await model.present();
  }
}
