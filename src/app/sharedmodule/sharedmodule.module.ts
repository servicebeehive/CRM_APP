import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/header/header.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent]
})
export class SharedmoduleModule { }
