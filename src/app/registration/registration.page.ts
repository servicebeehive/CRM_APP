import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
   public crmLogo='assets/icon/Logo_only.png';
    ngOnInit() {}
 userForm = this.fb.group({
      realEstate: ['',[Validators.required]],
      name: ['',[Validators.required]],
      phone: ['',[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      address: ['',[Validators.required]],
      country: ['',[Validators.required]],
      state: ['',[Validators.required]],
      city: ['',[Validators.required]],
    });

    dropdowns={
      realEstate:{
        label:'Industry',
        icon: 'cellular-outline',
        options: ['RealEstate','Education','Insurance']
      },
       country: {
    label: 'Select Country',
    icon: 'globe-outline',
    options: ['India', 'US']
  },
  state: {
    label: 'State',
    icon: 'flag-outline',
    options: ['CG', 'Bihar']
  },
  city: {
    label: 'City',
    icon: 'business-outline',
    options: ['Chennai', 'Mumbai', 'Pune']
  }
    };
    activeDropdown:string|null =null;

constructor(private fb: FormBuilder, private route:Router) { }

 onlyDigits(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
}

toggleDropdown(key:string){
  this.activeDropdown = this.activeDropdown === key ? null : key;
}
selectOption(controlName:string,value:string){
  this.userForm.patchValue({[controlName]:value});
  this.activeDropdown=null;
}

  onSubmit() {
    console.log(this.userForm.value);
     this.route.navigate(['/tabs/lead']);
  }
}
