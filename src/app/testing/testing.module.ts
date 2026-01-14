import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestingPageRoutingModule } from './testing-routing.module';

import { TestingPage } from './testing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TestingPage]
})
export class TestingPageModule {}
