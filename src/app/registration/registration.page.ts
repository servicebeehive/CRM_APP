import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  showCityDropdown = false;
showStateDropdown = false;
showCountryDropdown=false;
showLanguageDropdown=false;
selectedCity = '';
selectedState='';
selectedCountry='';
selectedLanguage='';

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


constructor(private fb: FormBuilder, private route:Router) { }
toggleLanguage(){
  this.showLanguageDropdown = !this.showLanguageDropdown;
  this.showCityDropdown=false;
  this.showStateDropdown=false;
  this.showCountryDropdown=false;
}
toggleCity() {
  this.showCityDropdown = !this.showCityDropdown;
  this.showLanguageDropdown=false;
  this.showStateDropdown=false;
  this.showCountryDropdown=false;
}
toggleState() {
  this.showStateDropdown = !this.showStateDropdown;
  this.showLanguageDropdown=false;
  this.showCityDropdown=false;
  this.showCountryDropdown=false;
}
toggleCountry(){
  this.showCountryDropdown = !this.showCountryDropdown;
  this.showLanguageDropdown=false;
  this.showStateDropdown=false;
  this.showCityDropdown=false;
}

selectCity(city: string) {
  this.selectedCity = city;
  this.userForm.patchValue({ city });
  this.showCityDropdown = false;
}
selectState(state:string){
  this.selectedState=state;
  this.userForm.patchValue({state});
  this.showStateDropdown=false
}
selectCountry(country:string){
  this.selectedCountry=country;
  this.userForm.patchValue({country});
  this.showCountryDropdown=false;
}
  onSubmit() {
    console.log(this.userForm.value);
     this.route.navigate(['/tabs/lead']);
  }
}
