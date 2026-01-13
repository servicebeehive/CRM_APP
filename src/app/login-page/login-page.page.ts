import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  public crmLogo='assets/icon/Logo_only.png';
  public companyUrl = 'assets/icon/beehivelogo.png';
ngOnInit() {
  
}
 loginForm = this.fb.group({
    mobileNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/), // Only 10 digits allowed
      ],
    ],
  });

  constructor(private fb: FormBuilder,private route : Router) {}

  // Getter for easy access in HTML
  get mobileNumber() {
    return this.loginForm.get('mobileNumber');
  }

  // Clear the input
  clearNumber() {
    this.mobileNumber?.setValue('');
  }

  // Handle Send OTP
  sendOtp() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  }
signUp(){
  this.route.navigate(['/']);
}
}
