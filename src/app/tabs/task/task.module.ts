import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskPage } from './task.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TaskPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedmoduleModule
  ],
  declarations: [TaskPage],
})
export class TaskPageModule {}
