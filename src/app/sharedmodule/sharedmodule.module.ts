import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { IonicModule } from '@ionic/angular';
import { LoaderComponent } from 'src/app/common/loader/loader.component';


@NgModule({
  declarations: [HeaderComponent, LoaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent, LoaderComponent]
})
export class SharedmoduleModule { }
