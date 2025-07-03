import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterPage } from 'src/app/filter/filter.page';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from 'src/app/tabs/home/home.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
receivedData: any;
  @Input() header: string;
   @Input() myfilterData: any;
  constructor(
    public accountServices: AccountService,
    public router: Router,
    public modalController: ModalController,
    private fb:FormBuilder
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
