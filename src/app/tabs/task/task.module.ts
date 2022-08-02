import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskPage } from './task.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntegerInputDirectiveModule } from 'src/app/directives/integer-input-directive/integer-input-directive.module';
import { SharedmoduleModule } from 'src/app/sharedmodule/sharedmodule.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TaskPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IntegerInputDirectiveModule,
    SharedmoduleModule
  ],
  declarations: [TaskPage],
})
export class TaskPageModule {}
