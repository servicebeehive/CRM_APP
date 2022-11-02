import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // isLoading = new Subject<boolean>();

  // show() {
  //   this.isLoading.next(true);
  // }

  // hide() {
  //   this.isLoading.next(false);
  // }
  constructor (public loadingController: LoadingController){}
  async presentLoading(){
    const isLoading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'please wait...',
      duration: 2000
    });
    await isLoading.present();
  }

  dismiss(){
    this.loadingController.dismiss();
  }
}

