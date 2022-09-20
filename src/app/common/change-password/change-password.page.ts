import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/sharedmodule/cofirm-password.validator';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(
    public accountServices: AccountService,
    public router: Router,
    public modalController: ModalController,
    public fb: FormBuilder
  ) { }
  
  changepwd = this.fb.group({
    oldpwd: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    confirmPassword: ['', [Validators.required]]
  },
  {
    validators: CustomValidators.passwordMatchValidator,
  }
  );

  ngOnInit() {
  }

  public dismiss(): void {
    this.accountServices.removeToken();
    this.router.navigate(['/']);
  }

}
