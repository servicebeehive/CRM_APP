import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ReturnResult } from 'src/app/models/return-result';
import { UserDetail } from 'src/app/models/userdetail.model';
import { LoginService } from 'src/app/services/login/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {

  public emailpattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

  addUserDetail = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    phoneno: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10)]],
    emailid: ['', [Validators.required, Validators.pattern(this.emailpattern)]],
    enable: [true],
    photo: [''],
    updateUser: this.fb.array([])

  });

  constructor(
    public modalController: ModalController,
    public fb: FormBuilder,
    public notificationService: NotificationService,
    public loginService: LoginService
  ) {}

  ngOnInit() {}
  msg="";
  public url; 

  public dismiss(): void {
    this.modalController.dismiss({
      dismissed: true,
      loaddata: false,
    });
  }

  get formControl() {
    return this.addUserDetail.get('updateUser') as FormArray;
  }

  public onSubmitUser(): void {
    const userDetail = new UserDetail();
    userDetail.fullname =
      this.addUserDetail.value.firstName.trim() +
      ' ' +
      this.addUserDetail.value.lastName.trim();
    userDetail.username = this.addUserDetail.value.userName.trim();
    userDetail.pwd = this.addUserDetail.value.password.trim();
    userDetail.active = this.addUserDetail.value.enable ? 'y' : 'n';
    userDetail.email = this.addUserDetail.value.emailid;
    userDetail.phone = this.addUserDetail.value.phoneno;
    userDetail.photo = this.addUserDetail.value.photo;
    this.addUserDetail.value.photo = this.url;
    userDetail.operationtype = 'INSERT';
    this.loginService
      .getUsers(userDetail)
      .then((result: ReturnResult<UserDetail[]>) => {
        if (result.success) {
          this.modalController.dismiss({
            dismissed: true,
            loaddata: true,
          });
          this.notificationService.showToast<UserDetail[]>(result);
          this.loginService.isLoading.next(false);
        } else {
          this.notificationService.showToast<UserDetail[]>(result);
          this.loginService.isLoading.next(false);
        }
      });
  }

  selectFile(event: any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
    const mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
  }

  public onUserUpdate(index){
    const userDetail = new UserDetail();
    userDetail.operationtype = 'UPDATE';  
    userDetail.userid = (this.formControl.at(index).value as UserDetail).userid;
    // userDetail.fullname = (this.formControl.at(index).value as UserDetail).fullname;
    // userDetail.username = (this.formControl.at(index).value as UserDetail).username;
    // userDetail.pwd = (this.formControl.at(index).value as UserDetail).pwd;
    // userDetail.active = (this.formControl.at(index).value as UserDetail).active;
    // userDetail.email = (this.formControl.at(index).value as UserDetail).email;
    // userDetail.phone = (this.formControl.at(index).value as UserDetail).phone;
    // userDetail.photo = (this.formControl.at(index).value as UserDetail).photo;
    userDetail.fullname = this.formControl.at(index).get('firstName' + 'lastName').value;
    userDetail.username = this.formControl.at(index).get('userName').value;
    userDetail.pwd = this.formControl.at(index).get('password').value;
    userDetail.active = this.formControl.at(index).get('enable').value;
    userDetail.email = this.formControl.at(index).get('emailid').value;
    userDetail.phone = this.formControl.at(index).get('phoneno').value;
    this.loginService
      .getUsers(userDetail)
      .then((result: ReturnResult<UserDetail[]>) => {
        if (result.success) {
          this.modalController.dismiss({
            dismissed: true,
            loaddata: true,
          });
          this.notificationService.showToast<any>(result);
        } else {
          this.notificationService.showToast<any>(result);
        }
      });
  }

  isDisplayed = false;
  show(){
    this.isDisplayed = !this.isDisplayed;
  }
}
