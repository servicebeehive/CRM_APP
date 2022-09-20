import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserDetailPageRoutingModule } from './user-detail-routing.module';
import { UserDetailPage } from './user-detail.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDetailPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedmoduleModule
  ],
//  declarations: [UserDetailPage]
})
export class UserDetailPageModule {}
