import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SubmitStatusComponent } from './submit-status/submit-status.component';
import { DisplayStatusComponent } from './display-status/display-status.component';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    SharedmoduleModule
  ],
  declarations: [HomePage, SubmitStatusComponent, DisplayStatusComponent],
  providers: [DatePipe],
})
export class HomePageModule {}
