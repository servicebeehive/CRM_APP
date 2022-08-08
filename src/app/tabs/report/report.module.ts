import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPageRoutingModule } from './report-routing.module';

import { ReportPage } from './report.page';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    ReportPageRoutingModule,
    SharedmoduleModule
  ],
  declarations: [ReportPage],
  providers: [DatePipe]
})
export class ReportPageModule {}
