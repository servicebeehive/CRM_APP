import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { IntegerInputDirectiveModule } from '../directives/integer-input-directive/integer-input-directive.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    IntegerInputDirectiveModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
