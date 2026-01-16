import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  digits = new Array(4);
  timer: number = 60;
  interval: any;
  isResendEnabled: boolean = false;
  public crmLogo = 'assets/icon/Logo_only.png';
  constructor(private toastCtrl: ToastController, private route: Router) {}
  @ViewChildren('otpInput') otpInputs!: QueryList<IonInput>;
  ngOnInit() {
    this.startTimer();
  }
  onInput(event: any, index: number) {
    const value = event.target.value;
    if (value && index < this.digits.length - 1) {
      this.otpInputs.toArray()[index + 1].setFocus();
    }
  }
  onBackspace(index: number) {
    if (index > 0) {
      this.otpInputs.toArray()[index - 1].setFocus();
    }
  }
  async verifyOtp() {
    this.route.navigate(['/pages/profile']);
  }
  resendOtp() {
    clearInterval(this.interval);
    this.digits = Array(4);
    this.isResendEnabled = false;
    this.timer = 60;
    this.startTimer();
  }
  startTimer() {
    clearInterval(this.interval);
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
