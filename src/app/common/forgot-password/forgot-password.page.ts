import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/sharedmodule/cofirm-password.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotpwd = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    confirmPassword: ['', [Validators.required]]
  },
  {
    validators: CustomValidators.passwordMatchValidator,
  }
  );

  constructor(
    public accountServices: AccountService,
    public router: Router,
    public fb: FormBuilder
  ) { }

  isDisplayed = false;

  ngOnInit() {
  }

  public async onSubmit(){
   if (this.accountServices.USER_NAME = this.forgotpwd.value.username){
      this.isDisplayed = true;
   }
  }

  public cancel(): void {
    this.accountServices.removeToken();
    this.router.navigate(['/']);
  }
}
