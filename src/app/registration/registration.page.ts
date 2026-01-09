import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
    ngOnInit() {}
 userForm = this.fb.group({
      realEstate: [''],
      name: [''],
      phone: [''],
      email: [''],
      address: [''],
      country: [''],
      state: [''],
      city: [''],
    });


constructor(private fb: FormBuilder, private route:Router) { }

  onSubmit() {
    console.log(this.userForm.value);
     this.route.navigate(['/tabs/lead']);
  }
}
