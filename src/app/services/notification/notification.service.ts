import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ReturnResult } from 'src/app/models/return-result';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public toast: ToastController) {}

  public showToast<T>(result: ReturnResult<T>): void {
    this.toast
      .create({
        message: result.message,
        position: 'top',
        duration: 3000,
        cssClass: result.success ? 'success-class' : 'error-class',
      })
      .then((toastData) => {
        toastData.present();
      });
  }

  public normalShowToast(txtMessage: string, isScucess: boolean) {
    this.toast
      .create({
        message: txtMessage,
        position: 'top',
        duration: 3000,
        cssClass: isScucess ? 'success-class' : 'error-class',
      })
      .then((toastData) => {
        toastData.present();
      });
  }
}
