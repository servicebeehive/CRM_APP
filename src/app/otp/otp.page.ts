import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
digits: string[] = ['', '', '', '', '', ''];
otpValue:string='';
  timer: number = 30;
  interval: any;
  isResendEnabled: boolean = false;

  constructor(private toastCtrl: ToastController,private route:Router) {}
 @ViewChildren('otpInput') otpInputs!: QueryList<IonInput>;
  ngOnInit() {
    this.startTimer();
  }

  // move focus automatically
 
  async verifyOtp() {
       this.route.navigate(['/pages/profile']);
  }


  resendOtp() {
    this.digits = ['', '', '', '', '', ''];
    this.isResendEnabled = false;
    this.timer = 30;
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.isResendEnabled = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
