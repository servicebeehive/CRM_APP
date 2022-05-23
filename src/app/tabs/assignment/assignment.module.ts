import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignmentPageRoutingModule } from './assignment-routing.module';

import { AssignmentPage } from './assignment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AssignmentPageRoutingModule,
  ],
  declarations: [AssignmentPage],
  providers: [DatePipe],
})
export class AssignmentPageModule {}
